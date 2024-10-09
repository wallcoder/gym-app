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

    const token = jwt.sign({userId: findUser.id, role: findUser.roleName, firstName: findUser.firstName, lastName: findUser.lastName }, secretKey, {expiresIn: '3h'} )
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

