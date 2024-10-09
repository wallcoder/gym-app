import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";
export const OTP = sequelize.define('OTP', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: { msg: 'Email is required' }
      }
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => {
        
        return new Date(Date.now() + 5 * 60 * 1000);
      }
    }
  }, {
    timestamps: false, 
    tableName: 'otps'
  });