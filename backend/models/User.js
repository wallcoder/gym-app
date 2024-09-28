import mongoose  from "mongoose";
import { Membership } from "./Gym.js";
const Schema = mongoose.Schema;


const gymAdminSchema = new Schema({
    gymAdminUsername: {type: String, required: true},
    gymAdminType: {type: String, required: true},
    gymAdminPassword: {type: String, required: true}, 
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})
const adminSchema = new Schema({
    adminUsername: {type: String, required: true},
    adminType: {type: String, required: true},
    adminPassword: {type: String, required: true}, 
    userId: {type: Schema.Types.ObjectId, ref: 'User'}

},{timestamps: true})



const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: String,
    email: {type: String, required: true},
    userType: {type: String, enum: ['client', 'admin', 'gym-admin'], required: true},
    membership: [
        {
            membershipID: [{type: Schema.Types.ObjectId, ref: 'Membership', required: false} ],
            expiryDate: {type: Date, required: true}
        }
    ],
    
    clientPassword: String

    
}, {timestamps: true})


const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const GymAdmin = mongoose.model('GymAdmin', gymAdminSchema)

export {User, Admin, GymAdmin}
