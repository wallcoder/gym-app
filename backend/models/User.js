import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../config/db.js";

// Define User Model
const UserRole = sequelize.define('UserRole', {
    roleName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    roleDescription:{
        type: DataTypes.STRING,
        allowNull: true
    }

})
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
    },
    
    roleId: {
        type: DataTypes.INTEGER,
        references:{
            model: UserRole,
            key: 'id'
        }
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    timestamps: true,
})



UserRole.hasMany(User, {foreignKey: 'roleId'})
User.belongsTo(UserRole, {foreignKey: 'roleId'})

export  {User, UserRole};