import express from "express";
import { insertUser } from "../controllers/userController.js";
import { sendOTP } from "../controllers/otp.js";
import { verifyOTP } from "../controllers/otp.js";
import { userLogin, findUserFromToken } from "../controllers/login.js";
import { getSubscriptionPlans } from "../controllers/planController.js";
import { authenticateToken } from "../controllers/login.js";
import { getSubscriptionPlanById } from "../controllers/planController.js";
import { decodeToken } from "../controllers/login.js";
import { insertGym } from "../controllers/gymController.js";
import { getGymById, getGyms } from "../controllers/gymController.js";
const router = express.Router();

// SIGN UP
router.post('/register', insertUser)


// OTP
router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTP)

// LOGIN
router.post('/login', userLogin)

router.post('/user-token', findUserFromToken)

// decode token
router.post('/decode-token', decodeToken)


// gym
router.post('/register-gym', insertGym)
router.get('/gyms', getGyms)
router.get('/gyms/:id', getGymById)


// SUBSCRIPTION PLANS
router.get('/subscription-plans', getSubscriptionPlans)
router.get('/subscription-plans/:id', getSubscriptionPlanById)
export default router;