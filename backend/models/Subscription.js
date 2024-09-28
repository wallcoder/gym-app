import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},

}, {timestamps: true})

const Subscription = mongoose.model('Subscription', subscriptionSchema)
export default Subscription;