import express from "express";
import { insertUser } from "../controllers/userController.js";
import { sendOTP } from "../controllers/otp.js";
import { verifyOTP } from "../controllers/otp.js";
import { userLogin } from "../controllers/login.js";
import { getSubscriptionPlans } from "../controllers/planController.js";
import { authenticateToken } from "../controllers/login.js";
const router = express.Router();

// SIGN UP
router.post('/register', insertUser)


// OTP
router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTP)

// LOGIN
router.post('/login', userLogin)

// SUBSCRIPTION PLANS
router.get('/subscription-plans', getSubscriptionPlans)
export default router;