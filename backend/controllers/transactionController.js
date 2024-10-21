import { Plan } from "../models/Gym.js";
import sequelize from "../config/db.js";
import { Transaction } from "../models/Transaction.js";

export const insertTransaction = (req, res) => {

    const { paymentId,
        userId,
        planId,
        transactionType,
        amount,
        status,
        receiverId,
        details,
        paymentType } = req.body
    

    try {
        const newTransaction = Transaction.create({
            refId: paymentId,
            userId,
            planId,
            transactionType,
            transactionMethod: paymentType,
            amount,
            status,
            receiverId,
            details
        })

        res.json({ message: 'Transaction Stored Successfuylly' })
    } catch (error) {
        res.json({ message: 'error in inserting transaction', error })

    }


}