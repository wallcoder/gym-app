import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";
import { Gym } from "./Gym.js";

export const PaymentGateway = sequelize.define('PaymentGateway', {
    apiKey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apiKeySecret: {
        type: DataTypes.STRING,
        allowNull: false
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gym,
            key: 'id'
        }

    }
})

Gym.hasOne(PaymentGateway, { foreignKey: "gymId" })
PaymentGateway.belongsTo(Gym, { foreignKey: "gymId" })