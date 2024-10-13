import { Plan } from "../models/Gym.js";
import sequelize from "../config/db.js";



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


export const getSubscriptionPlanById = async (req, res) => {
    try {
        console.log("helllooo")

        const id = req.params.id
        const subscriptionPlan = await Plan.findOne({ where: { planType: 'subscription', id } })
        res.json(subscriptionPlan)
    } catch (err) {
        res.status(400).json(err)
    }
}
