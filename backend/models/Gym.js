import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";


// GYM
export const Gym = sequelize.define('Gym', {
    gymName: DataTypes.STRING,
    gymPhone: DataTypes.STRING,
    gymEmail: DataTypes.STRING,
    gymApiKey: DataTypes.STRING,
    gymApiSecretKey: DataTypes.STRING
    

},{
    timestamps: true
})


// PLAN (MEMEBERSHIPS AND SUBSCRIPTION)
export const Plan = sequelize.define('Plan', {
    planName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    planDescription:{
        type: DataTypes.STRING,
        allowNull: false
    },
    planType:{
        type: DataTypes.ENUM('membership', 'subscription'),
        allowNull: false

    },
    price:{
        type:DataTypes.FLOAT,
        allowNull: false
    },
    gymId:{
        type:DataTypes.INTEGER,
        references:{
            model: Gym,
            key: 'id'
        },
        allowNull: true
    },
    state:{
        type:DataTypes.ENUM('active', 'inactive'),
        allowNull: false
    }

}, {timestamps: true})

Gym.hasMany(Plan, {foreignKey: 'gymId'})
Plan.belongsTo(Gym, {foreignKey: 'gymId'})