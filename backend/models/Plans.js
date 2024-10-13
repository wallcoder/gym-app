
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";
import { Plan } from "./Gym.js";

export const PlanMapping = sequelize.define('PlanMapping', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
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
    
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'expired'),
        allowNull: false,
        

    },

    expireDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {timestamps: true})


User.hasMany(PlanMapping, {foreignKey: 'userId'})
PlanMapping.belongsTo(User, {foreignKey: 'userId'})
Plan.hasMany(PlanMapping, {foreignKey: 'planId'})
PlanMapping.belongsTo(Plan, {foreignKey: 'planId'})