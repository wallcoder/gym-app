import express from "express";
import { insertUser } from "../controllers/userController.js";
import { sendOTP } from "../controllers/otp.js";
import { verifyOTP } from "../controllers/otp.js";
import { userLogin, findUserFromToken } from "../controllers/login.js";
import { checkPlan, getSubscriptionPlans, insertPlanMapping } from "../controllers/planController.js";
import { authenticateToken } from "../controllers/login.js";
import { getSubscriptionPlanById } from "../controllers/planController.js";
import { decodeToken } from "../controllers/login.js";
import { getFeatures, getWorkouts, insertGym } from "../controllers/gymController.js"; // New controller for gym registration
import { getGymById, getGyms } from "../controllers/gymController.js";
import { PaymentGateway } from "../models/paymentGateway.js";
import { createOrder, getPublicKey, paymentDetails, verifyPayment } from "../controllers/paymentGateway.js";
import '../controllers/paymentGateway.js'
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { insertTransaction } from "../controllers/transactionController.js";


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  }
});

const upload = multer({ storage: storage });

// Route for gym registration with file handling (images)
router.post('/register-gym', upload.fields([
  { name: 'gymImages', maxCount: 10 },    // Gym images array
  { name: 'gymProfileImage', maxCount: 1 } // Single profile image
]), insertGym);  // Call the controller function for gym registration

// SIGN UP
router.post('/register', insertUser);

// OTP
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// LOGIN
router.post('/login', userLogin);
router.post('/user-token', findUserFromToken);

// decode token
router.post('/decode-token', decodeToken);

// gym
router.get('/gyms', getGyms);
router.get('/gyms/:id', getGymById);

// SUBSCRIPTION PLANS
router.get('/subscription-plans', getSubscriptionPlans);
router.get('/subscription-plans/:id', getSubscriptionPlanById);


// PAYMENT GATEWAY
router.post('/create-order', createOrder)
router.post('/verify-payment', verifyPayment)
router.get('/payment-details/:id', paymentDetails)
router.post('/public-key', getPublicKey)



// TRANSACTIOn
router.post('/store-transaction', insertTransaction)

// PLAN
router.post('/insert-plan', insertPlanMapping)

// FEATURES
router.get('/features', getFeatures )

// WORKOUTS
router.get('/workouts', getWorkouts)

// QR CODE
router.get('/check-plan/:planMapId', checkPlan);
export default router;
