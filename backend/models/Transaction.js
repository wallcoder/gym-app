import mongoose from "mongoose";
import { User } from "./User.js";
import { Membership } from "./Gym.js";
import Subscription from "./Subscription.js";
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    transactionType: {type: String, required: true},
    amount: {type: Number, required: true},
    currency: {type: String, required: true},
    status: {type: String, required: true},
    referenceId: String,
    method: String,

    membershipId: {type: Schema.Types.ObjectId, ref: 'Membership', required: false},
    subscriptionId: {type: Schema.Types.ObjectId, ref: 'Subscription', required: false}

})


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;