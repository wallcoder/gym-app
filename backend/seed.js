import sequelize from "./config/db.js";
import { UserRole } from "./models/User.js";
import {Plan} from './models/Gym.js'

const insertUserType = () => {
    try {
        const userType = UserRole.create({
            id: 2,
            roleName: 'user',


        })
    } catch (err) {
        console.log(err)
    }
}

const insertSubscription = ()=>{
    try{
        const sub = Plan.bulkCreate([{
            planName: 'Listing Only',
            planDescription: 'This is a monthly subscription plan',
            planType: 'subscription',
            prie: 500,
            state: 'active',
            duration: 1



        },
        {
            planName: 'Full Plan',
            planDescription: 'This is a Full plan',
            planType: 'subscription',
            price: 1200,
            state: 'active',
            duration: 1



        }])
    }catch(err){
        console.log(err)
    }
}

// insertUserType()

insertSubscription();