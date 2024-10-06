import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../config/db.js";

// Define User Model

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    timestamps: true,
})

export default User;