
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";
import { Gym, Plan } from "./Gym.js";

export const PlanMapping = sequelize.define('PlanMapping', {
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

    gymId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Gym,
            key: 'id'
        }
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,


    },

    expireDate: {
        type: DataTypes.DATE,
        allowNull: true
    },

    qrCode: {
        type: DataTypes.TEXT,
        allowNull: true

    }
}, { timestamps: true })


User.hasMany(PlanMapping, { foreignKey: 'userId' })
PlanMapping.belongsTo(User, { foreignKey: 'userId' })
Plan.hasMany(PlanMapping, { foreignKey: 'planId' })
PlanMapping.belongsTo(Plan, { foreignKey: 'planId' })

Gym.hasMany(PlanMapping, { foreignKey: 'gymId' })
PlanMapping.belongsTo(Gym, { foreignKey: 'gymId' })