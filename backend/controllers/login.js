import { User } from "../models/User.js";
import { UserRole } from "../models/User.js";
import { DataTypes, Op } from "sequelize";
import sequelize from "../config/db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const secretKey = 'h75jd427#j'
// NORMAL LOGIN
export const userLogin = async (req, res)=>{
    const {email, password} = req.body;
    console.log(req.body)

    const findUser = await User.findOne({
        where: {email: email},
        include: [{
          model: UserRole,  
        }],
        limit: 1  
      });

    if(!findUser || !(await bcrypt.compare(password, findUser.password)) ){
        return res.status(401).json({passwordMessage: "Invalid credentials"})
    }

    const token = jwt.sign({userId: findUser.id, role: findUser.roleName, firstName: findUser.firstName, lastName: findUser.lastName }, secretKey )
    res.json({token})

}


// Middleware to verify JWT
export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


export const findUserFromToken = async (req, res) => {
    
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;

       
        const userDetails = await User.findOne({
            where: { id: userId },
            include: [{ model: UserRole }]
        });

        if (!userDetails) {
            return res.status(404).json({ message: "User not found" });
        }

        
        res.json({
            id: userDetails.id,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            role: userDetails.UserRole?.roleName // Assuming 'roleName' exists in the UserRole model
        });
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid token" });
    }
};

export const decodeToken = async (req, res)=>{
    
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        
        const decodedToken = jwt.verify(token, secretKey);
       

        res.json({
            userId: decodedToken.userId,
            role: decodedToken.role,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
        })
       
        
       
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid token" });
    }

}