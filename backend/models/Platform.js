import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";


export const Platform = sequelize.define('Platform', {
    name: DataTypes.STRING,
    apiKey: DataTypes.STRING,
    apiSecretKey: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
}, {timestamps: true})