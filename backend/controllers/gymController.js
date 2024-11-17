import { Gym, GymFeature, GymWorkout, GymWorkoutMapping, GymOpeningHours, GymLocation, GymImages, Rating } from "../models/Gym.js";
import { User } from "../models/User.js";
import { Plan } from "../models/Gym.js";
import sequelize from "../config/db.js";
import { GymFeatureMapping } from "../models/Gym.js";
import { Op, where } from "sequelize";
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // To check if the folder exists
import { PlanMapping } from "../models/Plans.js";
import { encrypt } from "./paymentGateway.js";
import { insertApiKey } from "./paymentGateway.js";
import { Saved } from "../models/Gym.js";
import { Notification } from "../models/Gym.js";
import { insertPlanMappingDraft } from "./planController.js";
import { Transaction } from "../models/Transaction.js";

// Define storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        // Check if the directory exists, if not create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
    }
});

// Multer instance to handle uploads
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPG and PNG files are allowed'), false);
        }
        cb(null, true);
    }
}).fields([
    { name: 'gymImages', maxCount: 5 }, // Handle up to 5 gym images
    { name: 'gymProfileImage', maxCount: 1 } // Handle 1 profile image
]);

export const changeGymInfo = async (req, res) => {
    try {
        const { gymId } = req.params
        const { phone, email } = req.body

        const updateGym = await Gym.update({
            gymPhone: phone,
            gymEmail: email,

        }, { where: { id: gymId } })

        res.json(updateGym)

    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const countData = async(req, res)=>{
    try{
        const {gymId} = req.params
        const profits = await Transaction.sum('amount',{where: {receiverId: gymId, status: 'success'}})
        const membershipPlans = await Plan.count({where: {gymId}})
        const activeMembers = await PlanMapping.count({where: {gymId}})

        res.json({profits, membershipPlans, activeMembers})

        
    }catch(err){
        console.log(err)
        res.json(err)
    }
}

export const setGymVerified = async (req, res) => {
    try {
        const { gymId } = req.body;
        const updateGym = await Gym.update({ status: 'verified' }, { where: { id: gymId } })
        res.json(updateGym)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const updateGymAdminWorkout = async (req, res) => {
    try {


        const { gymWorkoutId, gymId } = req.params
        const check = await GymWorkoutMapping.findOne({ where: { gymWorkoutId } })
        if (check) {
            const delWorkout = GymWorkoutMapping.destroy({ where: { gymWorkoutId } })
            return res.json(delWorkout)
        }
        const addWorkout = await  GymWorkoutMapping.create({
            gymId,
            gymWorkoutId
        })

        res.json(addWorkout)

        
    }catch(err){
        console.log(err)
        res.json(err)
    }


    
}

export const addMembershipPlan = async(req, res)=>{
    try{
        const {planName, planDescription, price, version} = req.body
        const {gymId} = req.params

        const add = await Plan.create({
            planName,
            planDescription,
            planType: 'membership',
            price,
            version,
            gymId,
            state: 'active'

        })

        res.json(add)
    }catch(err){
        console.log(err)
        res.json(err)
    }
}

export const updateMembershipPlan =async(req, res)=>{
    try{
        const {planId} = req.params
        const check = await Plan.findOne({where: {id: planId, state: 'active'}})
        if(check){
            console.log("activeee")
            const deactivate = await Plan.update({state: 'inactive'},{where: {id: planId}})
            return res.json(deactivate)
        }
        const activate = await Plan.update({state: 'active'}, {where: {id: planId}})
        res.json(activate)
    }catch(err){
        console.log(err)
        res.json(err)
    }
} 

export const deleteMembershipPlan = async(req, res)=>{
    try{
        const {planId} = req.params
        const check = await PlanMapping.findOne({where: {planId}})

        if(check){
           return res.status(400).json({message: 'plan is used. cannot delete'})
        }

        const deletePlan = await Plan.destroy({where: {id: planId}})

        res.json(deletePlan)
    }catch(err){
        console.log(err)
    }
}
export const updateGymAdminFeature = async (req, res) => {
    try {


        const { gymFeatureId, gymId } = req.params
        const check = await GymFeatureMapping.findOne({ where: { gymFeatureId } })
        if (check) {
            const delWorkout = GymFeatureMapping.destroy({ where: { gymFeatureId } })
            return res.json(delWorkout)
        }
        const addFeature = await  GymFeatureMapping.create({
            gymId,
            gymFeatureId
        })

        res.json(addFeature)

        
    }catch(err){
        console.log(err)
        res.json(err)
    }


    
}

export const changeGymPp = async (req, res) => {
    const { gymId } = req.params;
    const pp = req.files.pp || [];
    const ppPath = pp.map(img => `/uploads/${img.filename}`);
    console.log("Image Paths: ", ppPath);

    const results = [];

    for (const img of ppPath) {
        try {
            console.log(img);
            await Gym.update(
                { profileImage: img }, // Correct update syntax
                { where: { id: gymId } } // Proper where clause
            );
            console.log(`PP ${img} added successfully.`);
            results.push({ img, status: 'success' });
        } catch (error) {
            console.error(`Error adding feature ${img}:`, error);
            results.push({ img, status: 'error', error });
        }
    }

    // Send a consolidated response after processing all images
    res.json({ message: 'Process completed', results });
};


export const deleteGymImage = async (req, res) => {
    try {
        const { imageId, gymId } = req.params
        const checkImage = await GymImages.count({ where: { gymId } })
        console.log("check image: ", checkImage)
        if (checkImage === 1) {

            return res.status(400).json({ messageDel: 'Cannot Delete!! There should be atleast 1 image' })
        }
        const delImage = await GymImages.destroy({ where: { id: imageId } })
        res.json(delImage)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const addGymImage = async (req, res) => {
    try {

        const { gymId } = req.body
        const gymImages = req.files.gymImages || [];
        const gymImagePaths = gymImages.map(img => `/uploads/${img.filename}`);
        console.log("Image Paths: ", gymImagePaths, " ");

        for (const img of gymImagePaths) {
            try {
                console.log(img)
                await GymImages.create({
                    gymId,
                    gymImgPath: img
                });
                console.log(`Workout ${img} added successfully.`);
            } catch (error) {
                console.error(`Error adding feature ${img}:`, error);
            }

        }
        res.json({ message: 'successfull' })
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

// Route handler using multer for parsing multipart form-data
export const insertGym = async (req, res) => {
    try {
        // Extract gym data from the request
        console.log("hello")
        const gymData = await JSON.parse(req.body.gymData);
        console.log("PLAN ID: ", req.body.planId)
        console.log(gymData)

        const gymImages = req.files.gymImages || [];
        const gymProfileImage = req.files.gymProfileImage ? req.files.gymProfileImage[0] : null;
        const gymLicense = req.files.gymLicense ? req.files.gymLicense[0] : null;


        const gymImagePaths = gymImages.map(img => `/uploads/${img.filename}`);  // Store paths of gym images
        const gymProfileImagePath = gymProfileImage ? `/uploads/${gymProfileImage.filename}` : null;  // Store profile image path
        const gymLicensePath = gymLicense ? `/uploads/${gymLicense.filename}` : null;
        console.log("Image Paths: ", gymImagePaths, " ", gymProfileImagePath);
        console.log("gym license path: ", gymLicensePath)

        const newGym = await Gym.create({
            gymName: gymData.name,
            gymPhone: gymData.contact,
            gymEmail: gymData.email,
            gymLicense: gymLicensePath,
            ownerId: req.body.ownerId,
            profileImage: gymProfileImagePath,
            status: 'unverified'

        })
        if (!newGym) {
            res.status(400).json({ message: 'error creating gym' })
        }

        const gymId = newGym.id;

        await insertPlanMappingDraft(req.body.ownerId, req.body.planId, gymId)

        const newPlan1 = await Plan.create({
            planName: gymData.membershipPlans.plan1.title,
            planDescription: gymData.membershipPlans.plan1.description,
            duration: gymData.membershipPlans.plan1.duration,
            price: gymData.membershipPlans.plan1.price,
            planType: 'membership',
            gymId: gymId,
            state: 'active'


        })

        if (!newPlan1) {
            res.status(400).json({ message: 'error creating plan 1' })
        }

        const plan2 = gymData.membershipPlans.plan2;

        if (!plan2.title || !plan2.description || !plan2.duration || !plan2.price) {
            // return res.json({ message: 'fill the others' })
        } else {


            const newPlan2 = await Plan.create({
                planName: plan2.title,
                planDescription: plan2.description,
                duration: plan2.duration,
                price: plan2.price,
                planType: 'membership',
                gymId: gymId,
                state: 'active'

            })
        }
        const plan3 = gymData.membershipPlans.plan3;

        if (!plan3.title || !plan3.description || !plan3.duration || !plan3.price) {
            // return res.json({ message: 'fill the others' })
        }
        else {



            const newPlan3 = await Plan.create({
                planName: plan3.title,
                planDescription: plan3.description,
                duration: plan3.duration,
                price: plan3.price,
                planType: 'membership',
                gymId: gymId,
                state: 'active'

            })
        }

        const features = gymData.features

        for (const feature of features) {
            try {
                console.log(feature)
                await GymFeatureMapping.create({
                    gymId: gymId,
                    gymFeatureId: feature
                });
                console.log(`Feature ${feature} added successfully.`);
            } catch (error) {
                console.error(`Error adding feature ${feature}:`, error);
            }
        }

        const workouts = gymData.workouts
        for (const workout of workouts) {
            try {
                console.log(workout)
                await GymWorkoutMapping.create({
                    gymId: gymId,
                    gymWorkoutId: workout
                });
                console.log(`Workout ${workout} added successfully.`);
            } catch (error) {
                console.error(`Error adding feature ${workout}:`, error);
            }
        }

        const morning = `${gymData.openingHours.morning.start}am - ${gymData.openingHours.morning.end}am`
        const evening = `${gymData.openingHours.evening.start}pm - ${gymData.openingHours.evening.end}pm`


        const newOpeningHour = await GymOpeningHours.create({
            gymId,
            morning,
            evening
        })

        const location = gymData.location

        const newLocation = await GymLocation.create({
            buildingNo: location.buildingNo,
            latitude: location.lat,
            longitude: location.lng,
            area: location.area,
            city: location.city,
            landmark: location.landmark,
            gymId
        })

        for (const img of gymImagePaths) {
            try {
                console.log(img)
                await GymImages.create({
                    gymId,
                    gymImgPath: img
                });
                console.log(`Workout ${img} added successfully.`);
            } catch (error) {
                console.error(`Error adding feature ${img}:`, error);
            }

        }

        const enApi = encrypt(gymData.publicKey, gymData.secretKey)

        insertApiKey(enApi.encryptedData1, enApi.encryptedData2, enApi.key, enApi.iv, gymId)

        res.json({ message: 'successful operation' })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register gym", details: err.message });
    }
};
export const getAllGyms = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const offset = (page - 1) * limit;
        const { all } = req.query;
        let term = req.query.term;
        let gymCondition;
        // Prepare the search term for LIKE queries
        if (term) {
            term = isNaN(term) ? `%${term}%` : parseInt(term, 10);
        }

        // Define condition for Gym model based on term
        if (all) {


            gymCondition = term
                ? {
                    [Op.or]: [

                        { gymName: { [Op.iLike]: term } },
                        { gymPhone: { [Op.iLike]: term } },
                        { gymEmail: { [Op.iLike]: term } },
                        { status: { [Op.iLike]: term } },
                    ],
                }
                : {};
        } else {
            gymCondition = term
                ? {
                    [Op.or]: [

                        { gymName: { [Op.iLike]: term } },
                        { gymPhone: { [Op.iLike]: term } },
                        { gymEmail: { [Op.iLike]: term } },
                        { status: { [Op.iLike]: term } },
                    ],

                }
                : { status: 'verified' };

        }

        // Step 1: Count gyms based on gymCondition without including associations
        const totalItems = await Gym.count({ where: gymCondition });

        // Step 2: Fetch gyms with associations and pagination
        const gyms = await Gym.findAll({
            where: gymCondition,
            limit,
            offset,
            include: [
                {
                    model: GymLocation,
                    required: false,
                    where: term
                        ? {
                            [Op.or]: [
                                { city: { [Op.iLike]: term } },
                                { landmark: { [Op.iLike]: term } },
                            ],
                        }
                        : {},
                },
                { model: User, required: false },
                {
                    model: GymFeatureMapping,
                    required: false,
                    include: [{ model: GymFeature, required: false }],
                },
                { model: GymImages, required: false },
                {
                    model: PlanMapping,
                    required: false, // optional: allow gyms without plans
                    separate: true,
                    limit: 1,
                    where: { status: 'draft' },
                    order: [['createdAt', 'DESC']], // get the latest draft
                }
            ],
        });


        const totalPages = Math.ceil(totalItems / limit);
        const currentPage = page;

        // Respond with paginated data
        res.json({
            allGyms: gyms,
            totalPages,
            currentPage,
            totalGyms: totalItems,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching gyms.' });
    }
};

export const checkGymAdmin = async (req, res) => {
    try {
        console.log("check gym: ", req.params)
        const { gymId, ownerId } = req.params

        const check = await Gym.findOne({
            where: { id: gymId, ownerId },
            include: [{ model: PlanMapping, where: { status: 'active' } }, { model: GymLocation }, { model: GymImages }]
        })

        if (!check) {
            return res.json({ found: false })
        }
        res.json({ found: true, gymId: check.id, myGym: check })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred' });
    }
}

export const getGyms = async (req, res) => {
    try {
        console.log("get gyms: ", req.query)
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const offset = (page - 1) * limit;
        const location = req.query.location
        const totalGyms = await Gym.count({
            where: { status: 'verified' },
            include: [
                {
                    model: GymLocation,
                    where: { city: location, }
                },
                {
                    model: PlanMapping,
                    required: true, // optional: allow gyms without plans


                    where: { status: 'active' },
                    order: [['createdAt', 'DESC']],
                },
                { model: Plan }
            ]
        });
        const gyms = await Gym.findAll({
            limit,
            offset,
            where: { status: 'verified' },
            include: [
                {
                    model: GymLocation,
                    where: { city: location }
                },
                {
                    model: PlanMapping,
                    required: true, // optional: allow gyms without plans
                    where: { status: 'active' },
                    order: [['createdAt', 'DESC']],
                },
                { model: Plan }
            ]
        });

        console.log("gyms: ", gyms)
        const totalPages = Math.ceil(totalGyms / limit);
        const currentPage = page;
        res.status(200).json({ gyms, totalPages, currentPage, totalGyms });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

export const getGymAdminFeatures = async (req, res) => {
    try {
        console.log("gym features: ", req.params)
        const { gymId } = req.params
        const features = await GymFeatureMapping.findAll({ where: { gymId } })
        res.json(features)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}
export const getGymAdminWorkouts = async (req, res) => {
    try {
        console.log("gym workouts: ", req.params)
        const { gymId } = req.params
        const workouts = await GymWorkoutMapping.findAll({ where: { gymId } })
        res.json(workouts)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const getGymTransactions = async (req, res) => {
    try {
        console.log("get gym transactions: ", req.query)
        const { gymId } = req.params
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const offset = (page - 1) * limit;
        const location = req.query.location
        const totalTransactions = await Transaction.count({
            where: { receiverId: gymId },
            include: [
                {
                    model: User,

                },

            ]
        });
        const transactions = await Transaction.findAll({
            limit,
            offset,
            where: { receiverId: gymId },
            include: [
                {
                    model: User,

                },

            ]
        });


        const totalPages = Math.ceil(totalTransactions / limit);
        const currentPage = page;
        res.status(200).json({ allItems: transactions, totalPages, currentPage, totalItems: totalTransactions });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};


export const getNotif = async (req, res) => {
    try {
        console.log("hello fro get notif", req.params)
        const { userId } = req.params

        const notif = await Notification.findAll({
            where: { userId }
        })
        console.log(notif)
        res.json(notif)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const getSaved = async (req, res) => {
    try {
        console.log(req.params)
        const { userId } = req.params;

        const userSaved = await Saved.findAll(
            {
                where: { userId }
            }
        )

        res.json(userSaved)

    } catch (err) {
        res.status(500).json(err)
    }


}

export const getUserSavedGyms = async (req, res) => {
    try {
        const { userId } = req.params;
        const savedGyms = await Gym.findAll({

            include: [
                { model: GymLocation },
                {
                    model: Saved,
                    where: { userId }
                },
                { model: Plan }
            ]
        });

        res.json(savedGyms)


    } catch (err) {
        res.status(500).json(err)
    }
}

export const getMyGyms = async (req, res) => {
    try {
        const { userId } = req.params;
        const myGyms = await Gym.findAll({
            where: { ownerId: userId },
            include: [
                { model: GymLocation },

                { model: Plan }
            ]
        })

        res.json(myGyms)
    } catch (err) {
        res.status(500).json(err)
    }
}
export const saveGym = async (req, res) => {
    const { gymId, userId } = req.body;
    console.log("from save gym: ", gymId, userId);

    try {

        const check = await Saved.findOne({
            where: {
                userId,
                gymId
            }
        });

        if (check) {

            await Saved.destroy({
                where: {
                    id: check.id
                }
            });

            res.json({ message: 'deleted' });
        } else {

            const newSaved = await Saved.create({
                userId,
                gymId
            });

            res.json({ newSaved, message: 'saved' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred' });
    }
};


export const searchGyms = async (req, res) => {

    let { term, location } = req.query




    try {


        if (!term) {
            return res.json({ gyms: [] })
        }


        term = `%${term}%`


        const search = await Gym.findAll(

            {
                where: {
                    gymName: { [Op.iLike]: term }
                },
                include: [
                    {
                        model: GymLocation,
                        where: { city: location }
                    },


                ]
            },


        )
        console.log(search)

        res.status(200).json({ gyms: search })


    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }


}

export const getGymById = async (req, res) => {
    try {
        const gym = await Gym.findOne({
            where: { id: req.params.id },
            include: [{ model: GymLocation }, { model: GymOpeningHours }, { model: Plan },
            {
                model: GymFeatureMapping,
                include: [{
                    model: GymFeature

                }]
            },
            {
                model: GymWorkoutMapping,
                include: [{
                    model: GymWorkout
                }]
            },
            {
                model: GymImages
            },
            {
                model: Plan
            }

            ]
        });
        if (!gym) {
            return res.status(404).json({ message: 'Gym not found' });
        }
        res.status(200).json(gym);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getFeatures = async (req, res) => {
    try {

        const features = await GymFeature.findAll();
        if (!features) {
            res.status(400).json({ message: 'Features not available' })
        }
        res.status(200).json(features)
    } catch (error) {
        res.status(400).json(error)

    }
}

export const getWorkouts = async (req, res) => {
    try {

        const workouts = await GymWorkout.findAll();
        if (!workouts) {
            res.status(400).json({ message: 'Workouts not available' })
        }
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json(error)

    }
}

export const getMemberships = async (req, res) => {
    try {
        console.log("memberships")
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const offset = (page - 1) * limit;
        let term = req.query.term;
        const { gymId } = req.params

        // Prepare the search term for LIKE queries
        if (term) {
            term = isNaN(term) ? `%${term}%` : parseInt(term, 10);
        }
        console.log(term)
        // Define condition for Gym model based on term
        const condition = {
            planType: 'membership',
            gymId, // Include the gymId in the filter
            ...(term && { // Add the search condition if `term` exists
                [Op.or]: [
                    { planName: { [Op.iLike]: term } },
                    { planDescription: { [Op.iLike]: term } },
                    { state: { [Op.iLike]: term } },
                ]
            })
        };

        // Step 1: Count gyms based on userCondition without including associations
        const totalItems = await Plan.count({ where: condition });

        // Step 2: Fetch gyms with associations and pagination
        const items = await Plan.findAll({
            where: condition,
            limit,
            offset,

        });

        const totalPages = Math.ceil(totalItems / limit);
        const currentPage = page;

        console.log(items)

        // Respond with paginated data
        res.json({
            allItems: items,
            totalPages,
            currentPage,
            totalUsers: totalItems,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
};


// const notif = async()=>{
//     const newNotif = await Notification.create({
//         title: "HEHEHE",
//         message: 'sdgsdgsdg',
//         link: '/',
//         userId: 44
//     })
// }

// notif()
// const open = async()=>{
//     const newOpen = await GymOpeningHours.create({
//         morning: '6:00am - 9:00am',
//         evening: '7:00pm - 10:00pm',
//         gymId: 30

//     })
// }
// open()


// const insertGymFeature = async ()=>{
//     const newFeat = await  GymFeature.create({
//         featureName: 'cardio',
//         featureImgPath: 'asfsafsaf'
//     })
// }

// insertGymFeature()
// insertGymFeature()

// const insertGymWorkout = async ()=>{
//     const newFeat = await  GymWorkout.create({
//         workoutName: 'sdgsdgsdg'
//     })
// }

// insertGymWorkout()
// insertGymWorkout()

// const insertMap = async ()=>{
//     const newMap = await GymFeatureMapping.create({
//         gymId: 30,
//         gymFeatureId: 3
//     })
// }

// const insertMapWork = async ()=>{
//     const newMap = await GymWorkoutMapping.create({
//         gymId: 30,
//         gymWorkoutId: 3
//     })
// }

// insertMap()
// insertMapWork()


// const insertPlan = async () => {
//     const newPlan = await Plan.bulkCreate([{

//         planName: "Listing Only",
//         planDescription: "List your gym on our app, with contact details displayed Member Registration will not be  processed through our app",
//         planType: "subscription",
//         price: 500,
//         state: "active",
//         duration: 1


//     },
//     {

//         planName: "Full Plan",
//         planDescription: "Our app will provide Gym Listing , membership registration and member management system.",
//         planType: "subscription",
//         price: 1200,
//         state: "active",
//         duration: 1


//     }])
// }

// insertPlan()

