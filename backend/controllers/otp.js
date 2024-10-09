import nodemailer from 'nodemailer';
import { OTP } from '../models/OTP.js';
import { User } from '../models/User.js';
import { Op } from 'sequelize';
import cron from 'node-cron'

cron.schedule('*/5 * * * *', async () => {
    try {
      
      const result = await OTP.destroy({
        where: {
          expiresAt: {
            [Op.lt]: new Date()
          }
        }
      });
  
      console.log(`Deleted ${result} expired OTPs`);
    } catch (error) {
      console.error('Error while deleting expired OTPs:', error);
    }
  });
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


// generates, sends and stores otp in database for further verification
export const sendOTP = async (req, res) => {
    try {
        console.log("OTP request")
        const data = req.body
        console.log(data)

        const otp = generateOTP()
        console.log("OTP generated: ", otp)
        const info = await transporter.sendMail({
            from: '"GymPass" <sbfactual@gmail.com>', // sender address
            to: data.email, // list of receivers
            subject: "Your OTP Code", // Subject line
            text: `Your OTP code is ${otp}`, // plain text body
            html: `<b>Your OTP code is ${otp}</b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        const insertOtp = await OTP.create({
            email: data.email,
            otp: otp
        })

        res.status(201).json({
            message:'OTP sent and stored'
        })
    }catch(err){
        res.status(400).json({otpMessage: 'OTP not sent'})
    }

}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        
        if (!email || !otp) {
            return res.status(400).json({ otpMessage: "OTP and Email fields cannot be empty" });
        }

      
        const checkEmail = await User.findOne({
            where: { email, status: "verified" }
        });

        if (checkEmail) {
            return res.status(400).json({ otpMessage: "User email is already verified" });
        }

       
        const checkOtp = await OTP.findOne({
            where: {
                otp: otp.toString(),
                expiresAt: { [Op.gt]: new Date() } // Ensure OTP has not expired
            }
        });

        if (!checkOtp) {
            console.log("otp invalid")
            return res.status(400).json({ otpMessage: "OTP has expired or is invalid" });
        }

        // Check if the OTP is linked to the same email
        if (checkOtp.email !== email) {
            return res.status(400).json({ otpMessage: "Wrong OTP" });
        }

        // Update user's status to 'verified'
        await User.update(
            { status: "verified" },
            { where: { email } }
        );

        res.status(200).json({ message: "User verified successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};