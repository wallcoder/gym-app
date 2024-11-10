import { User } from "../models/User.js";
import { UserRole } from "../models/User.js";
import { DataTypes, Op } from "sequelize";
import sequelize from "../config/db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const secretKey = 'h75jd427#j'
// NORMAL LOGIN
export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    console.log("userlogin: ", email, password)
    const findUser = await User.findOne({
        where: { email: email },
        include: [{
            model: UserRole,

        }],
        limit: 1
    });


    if (!findUser || !(await bcrypt.compare(password, findUser.password))) {
        return res.status(401).json({ passwordMessage: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: findUser.id, role: findUser.UserRole.roleName, firstName: findUser.firstName, lastName: findUser.lastName, googleId: findUser.googleId, imgPath: findUser.imgPath, email: findUser.email, createdAt: findUser.createdAt }, secretKey)
    console.log("Generated Token:", token);
    res.json({ token })

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
            role: userDetails.UserRole.roleName // Assuming 'roleName' exists in the UserRole model
        });
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid token" });
    }
};

export const decodeToken = async (req, res) => {

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
            googleId: decodedToken.googleId,
            imgPath: decodedToken.imgPath,
            email: decodedToken.email,
            createdAt: decodedToken.createdAt
        })



    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid token" });
    }

}