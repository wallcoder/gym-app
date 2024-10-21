import sequelize from "../config/db.js";
import { User } from "./User.js";
import { Plan } from "./Gym.js";
import { DataTypes } from "sequelize";
import { Gym } from "./Gym.js";

export const Transaction = sequelize.define('Transaction', {
    refId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
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
    transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transactionMethod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Gym,
            key: 'id'
        }
    }

}, { timestamps: true })
Gym.hasMany(Transaction, { foreignKey: 'receiverId' })
Transaction.belongsTo(Gym, { foreignKey: 'receiverId' })
User.hasMany(Transaction, { foreignKey: 'userId' })
Transaction.belongsTo(User, { foreignKey: 'userId' })
Plan.hasMany(Transaction, { foreignKey: 'planId' })
Transaction.belongsTo(Plan, { foreignKey: 'planId' })