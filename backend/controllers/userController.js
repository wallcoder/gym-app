import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';


import { User, UserRole } from '../models/User.js';
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "sbfactual@gmail.com",
        pass: "hbrjzyojxejwyqpe",
    },
});

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

