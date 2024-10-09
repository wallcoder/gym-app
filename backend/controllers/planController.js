import { Plan } from "../models/Gym.js";
import sequelize from "../config/db.js";
export const createPlan = ()=>{
    console.log("hello")
    Plan.create({
        planName: "Listing Only",
        planDescription: "List your gym on our app, with contact details displayed Member Registration will not be processed through our app",
        planType: "subscription",
        price: "700",
        state: "active"
    })
    Plan.create({
        planName: "Full Plan",
        planDescription: "Our app will provide Gym Listing , membership registration and member management system",
        planType: "subscription",
        price: "1200",
        state: "active"
    })




}


export const getSubscriptionPlans = async (req, res)=>{
    try{

    
    const subscriptionPlans = await Plan.findAll({where: {planType: 'subscription'}})
    // if(!subscriptionPlans){
    //     res.json({message: "no subscription plans found"})
    // }
    console.log(subscriptionPlans)
    res.json(subscriptionPlans)
}catch(err){
    res.json(err)
}
}



