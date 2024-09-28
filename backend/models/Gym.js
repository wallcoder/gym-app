import mongoose from "mongoose";
import Subscription from "./Subscription.js";

const Schema = mongoose.Schema;


const membershipSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    gymId: {type: Schema.Types.ObjectId, ref: 'Gym'}

    
})



const gymSchema = new Schema({
    gymName: {type: String, required: true},
    address: {
        lat: Number,
        lng: Number,
        address: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    
    email: {type: String, required: true},
    phone: {type: Number, required: true },
    equipments: [{
        name: {type: String, required: true}
    }],
    images: [{
        path: {type: String, required: true}
    }],
    subscription: {
        subscriptionId: {type: Schema.Types.ObjectId, ref: 'Subscription'},
        expireDate: {type: Date, required: true}
    }
    
    
}, {timestamps: true});

const Gym = mongoose.model('Gym', gymSchema);
const Membership = mongoose.model('Membership', membershipSchema)

export {Gym, Membership };