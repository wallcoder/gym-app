import sequelize from "../config/db.js";
import { User } from "./User.js";
import { Plan } from "./Gym.js";
import { DataTypes } from "sequelize";

export const Transaction = sequelize.define('Transaction', {
    refId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Plan,
            key: 'id'
        }
    },
    transactionType:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {timestamps: true})

User.hasMany(Transaction, {foreignKey: 'userId'})
Transaction.belongsTo(User, {foreignKey: 'userId'})
Plan.hasMany(Transaction, {foreignKey: 'planId'})
Transaction.belongsTo(Plan, {foreignKey: 'planId'})