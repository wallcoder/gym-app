import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { Op } from 'sequelize';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken'

dotenv.config();
const secretKey = process.env.SECRET_KEY

import { User, UserRole } from '../models/User.js';
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

export const googleLogin = async (req, res) => {
    const { profile } = req.body;
    console.log("google cred: ", profile, profile.email)

    try {
        const checkEmail = await User.findOne({
            where: { email: profile.email, googleId: null }
        })
        if (checkEmail) {
            return res.json({ message: 'an account is already created using this email' })
        }

        const checkUser = await User.findOne({
            where: { googleId: profile.sub },
            include: [{
                model: UserRole,

            }]
        })

        if (!checkUser) {
            const insertUser = await User.create({
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                imgPath: profile.picture,
                googleId: profile.sub,
                roleId: 2,
                status: 'verified'

            })

            const fetchUser = await User.findOne({
                where: { id: insertUser.id },
                include: [{
                    model: UserRole,

                }]
            })

            const token = jwt.sign({ userId: fetchUser.id, role: fetchUser.UserRole.roleName, firstName: fetchUser.firstName, lastName: fetchUser.lastName, googleId: fetchUser.googleId, imgPath: fetchUser.imgPath, email: fetchUser.email, createdAt: fetchUser.createdAt }, secretKey)
            return res.json({ token })
        }
        console.log("USERR: ", checkUser.imgPath)
        const token = jwt.sign({ userId: checkUser.id, role: checkUser.UserRole.roleName, firstName: checkUser.firstName, lastName: checkUser.lastName, googleId: checkUser.googleId, imgPath: checkUser.imgPath, email: checkUser.email, createdAt: checkUser.createdAt }, secretKey)
        res.json({ token })

    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(500).json(error)

    }
}
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "sbfactual@gmail.com",
        pass: "hbrjzyojxejwyqpe",
    },
})

const sendOTP = async () => {
    const otp = generateOTP()
    const info = await transporter.sendMail({
        from: '"GymPass" <sbfactual@gmail.com>', // sender address
        to: "validdepix@gmail.com", // list of receivers
        subject: "Your OTP Code", // Subject line
        text: `Your OTP code is ${otp}`, // plain text body
        html: `<b>Your OTP code is ${otp}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

}

// sendOTP().catch(console.error)
export const getAllUsers = async (req, res) => {
    try {
        console.log("HIYAAAAA")
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const offset = (page - 1) * limit;
        let term = req.query.term;

        // Prepare the search term for LIKE queries
        if (term) {
            term = isNaN(term) ? `%${term}%` : parseInt(term, 10);
        }
        console.log(term)
        // Define condition for Gym model based on term
        const userCondition = term
            ? {
                [Op.or]: [
                    { firstName: { [Op.iLike]: term } },
                    { lastName: { [Op.iLike]: term } },
                    { email: { [Op.iLike]: term } },
                    { status: { [Op.iLike]: term } },
                ],
            }
            : {};

        // Step 1: Count gyms based on userCondition without including associations
        const totalItems = await User.count({ where: userCondition });

        // Step 2: Fetch gyms with associations and pagination
        const gyms = await User.findAll({
            where: userCondition,
            limit,
            offset,
            include: [
                {
                    model: UserRole,
                    required: false,  // Allow gyms without locations
                    where: term
                        ? {

                            roleName: { [Op.iLike]: term },


                        }
                        : {},
                },

            ],
        });

        const totalPages = Math.ceil(totalItems / limit);
        const currentPage = page;

        console.log(gyms)

        // Respond with paginated data
        res.json({
            allItems: gyms,
            totalPages,
            currentPage,
            totalUsers: totalItems,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
};
export const delUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const delUser = await User.destroy({
            where: {
                email
            }
        })
        res.json({ message: 'user deleted', delUser })
    } catch (err) {
        res.status(500).json(err)
    }
}
export const insertUser = async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

        if (!passwordRegex.test(data.password)) {
            return res.status(400).json({ passwordMessage: 'Enter valid Password' });

        }
        if (!emailRegex.test(data.email)) {
            return res.status(400).json({ emailMessage: 'Enter valid Email' });

        }






        if (data.password !== data.conPassword) {
            return res.status(400).json({ passwordConMessage: 'Passwords not matching' });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const checkEmail = await User.findAll({
            where: {
                email: data.email
            }
        });

        if (checkEmail.length > 0) {

            return res.status(400).json({ emailMessage: 'Email already used' });


        }

        const newUser = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
            roleId: 2,
            status: 'unverified'

        });


        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
            }
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};

