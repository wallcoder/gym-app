import { Gym, Plan } from "../models/Gym.js";
import sequelize from "../config/db.js";
import { PlanMapping } from "../models/Plans.js";
import { Op } from 'sequelize';
import cron from 'node-cron';
import QRCode from 'qrcode';

// Function to generate QR code
const generateQRCode = async (planMapId) => {
    const url = `https://3ce0-117-209-90-77.ngrok-free.app/check-plan/${planMapId}`;

    try {
        // Generate the QR code
        const qrCodeDataURL = await QRCode.toDataURL(url);


        return qrCodeDataURL;
    } catch (err) {
        console.error('Error generating QR code:', err);

    }
};

// Example usage
//   generateQRCode(1).then((qrCode) => {
//     console.log(qrCode); 
//   });
// Schedule the cron job to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    try {

        const result = await PlanMapping.update(
            { status: 'expired' },  // Set the status to 'expired'
            {
                where: {
                    expireDate: {
                        [Op.lt]: new Date()  // Compare expiresAt to the current date
                    },
                    status: {
                        [Op.ne]: 'expired'  // Optional: only update rows that are not already 'expired'
                    }
                }
            }
        );


    } catch (error) {
        console.error('Error while updating expired plans:', error);
    }
});



function calculateDueDate(duration, durationType) {
    // Use the present date as the start date
    let date = new Date();
    console.log("current date: ", date)
    // Add the duration to the date based on the duration type
    switch (durationType) {
        case 'days':
            date.setDate(date.getDate() + duration);
            break;
        case 'months':
            date.setMonth(date.getMonth() + duration);
            break;
        case 'years':
            date.setFullYear(date.getFullYear() + duration);
            break;
        default:
            throw new Error('Invalid duration type. Use "days", "months", or "years".');
    }

    // Get the timezone offset in hours and minutes
    const tzOffset = -date.getTimezoneOffset();
    const sign = tzOffset >= 0 ? "+" : "-";
    const hoursOffset = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, '0');
    const minutesOffset = String(Math.abs(tzOffset) % 60).padStart(2, '0');

    // Format the date in the desired format (YYYY-MM-DD HH:mm:ss.SSS±hh:mm)
    const formattedDate = date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, '0') + "-" +
        String(date.getDate()).padStart(2, '0') + " " +
        String(date.getHours()).padStart(2, '0') + ":" +
        String(date.getMinutes()).padStart(2, '0') + ":" +
        String(date.getSeconds()).padStart(2, '0') + "." +
        String(date.getMilliseconds()).padStart(3, '0') +
        sign + hoursOffset + ":" + minutesOffset;

    return formattedDate;
}


console.log(calculateDueDate(1, 'months'))

export const getSubscriptionPlans = async (req, res) => {
    try {


        const subscriptionPlans = await Plan.findAll({ where: { planType: 'subscription' } })
        // if(!subscriptionPlans){
        //     res.json({message: "no subscription plans found"})
        // }

        res.status(200).json(subscriptionPlans)
    } catch (err) {
        res.json(err)
    }
}


export const getPlanByMap = async(req, res)=>{
    try{
        const {planMapId} = req.params

        const findPlanMap = await PlanMapping.findOne({
            where: {id: planMapId}
        })

        const findPlan = await Plan.findOne({
            where: {id: findPlanMap.planId},
            include: [{
                model: Gym
            }]
        })

        res.json(findPlan)
    }catch(err){
        console.log(err)
        res.json(err)
    }
}

export const rechargePlanMapping = async(req,res)=>{
    try{
        const {planMapId} = req.params
        
        const findPlanMap = await PlanMapping.findOne({
            where: {id: planMapId}
        })

        const findPlan = await Plan.findOne({
            where: {id: findPlanMap.planId}
        })

        const dueDate = calculateDueDate(Number(findPlan.duration), 'months')

        const updatePlanMapping = await PlanMapping.update({ status: 'active', expireDate: dueDate }, { where: { id: planMapId } })

        res.json({ message: 'plan intiated successfully', updatePlanMapping })

    }catch(err){
        res.json(err)
    }
}



export const getSubscriptionPlanById = async (req, res) => {
    try {


        const id = req.params.id
        const subscriptionPlan = await Plan.findOne({ where: { planType: 'subscription', id } })
        res.json(subscriptionPlan)
    } catch (err) {
        res.status(400).json(err)
    }
}


export const startPlanMapping = async (req, res) => {
    try {

        const { planMappingId } = req.body
        const getPlanMapping = await PlanMapping.findOne({ where: { id: planMappingId } })

        const getPlan = await Plan.findOne({ where: { id: getPlanMapping.id } })

        const dueDate = calculateDueDate(Number(getPlan.duration), 'months')

        const updatePlanMapping = await PlanMapping.update({ status: 'active', expireDate: dueDate }, { where: { id: planMappingId } })

        res.json({ messge: 'plan intiated successfully', updatePlanMapping })

    } catch (err) {
        console.log(err)
    }
}

export const insertPlanMappingDraft = async (userId, planId, gymId) => {
    try {

        console.log("from planMappingDraft: ", userId, planId, gymId);

        const getPlan = await Plan.findOne({ where: { id: planId } })

        if (!getPlan) {
            return res.json({ message: "plan not found" })

        }

        console.log(getPlan.duration)




        const newPlanMap = await PlanMapping.create({
            userId,
            planId,
            gymId,
            status: 'draft',


        })
        if (!newPlanMap) {
            console.log("no plan found")

        }

        const qr = await generateQRCode(newPlanMap.id)

        const addQR = await PlanMapping.update(
            {
                qrCode: qr
            }, {
            where: {
                id: newPlanMap.id
            }
        })
        if (!addQR) {
            console.log("qr cannot be created")

        }




        console.log("draft created successful")




    } catch (err) {
        console.log(err)
    }
}

export const insertPlanMapping = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        console.log("from planMapping: ", req.body);

        const getPlan = await Plan.findOne({ where: { id: planId } })

        if (!getPlan) {
            return res.json({ message: "plan not found" })

        }

        console.log(getPlan.duration)
        const dueDate = calculateDueDate(Number(getPlan.duration), 'months')



        const newPlanMap = await PlanMapping.create({
            userId,
            planId,
            status: 'active',
            expireDate: dueDate

        })
        if (!newPlanMap) {
            return res.json({ message: "cant insert plan mapping" })

        }

        const qr = await generateQRCode(newPlanMap.id)

        const addQR = await PlanMapping.update(
            {
                qrCode: qr
            }, {
            where: {
                id: newPlanMap.id
            }
        })
        if (!addQR) {
            return res.json({ message: "Cannt create qr code" })

        }




        res.json({ message: "successfulll" })




    } catch (err) {
        console.log(err)
    }
}



export const checkPlan = async (req, res) => {
    const { planMapId } = req.params;

    try {

        const plan = await PlanMapping.findOne({ where: { id: planMapId } });

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }


        const currentDate = new Date();
        if (plan.expireDate < currentDate) {

            return res.json({ status: 'expired', message: 'The plan has expired.' });
        } else {

            return res.json({ status: 'active', message: 'The plan is still active.' });
        }
    } catch (error) {
        console.error('Error checking plan status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getUserPlan = async (req, res) => {
    const { userId } = req.params;
    try {
        const userPlan = await PlanMapping.findAll({
            where: { userId },
            include: { model: Plan, where: { planType: 'membership' } }
        })

        res.json(userPlan)
    } catch (err) {
        res.status(500).json(err)
    }
}


