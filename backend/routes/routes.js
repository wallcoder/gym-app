import express from "express";
import { createNotif, delUserByEmail, getAllGymMembers, getAllUsers, googleLogin, insertUser } from "../controllers/userController.js";
import { sendOTP } from "../controllers/otp.js";
import { verifyOTP } from "../controllers/otp.js";
import { userLogin, findUserFromToken } from "../controllers/login.js";
import { checkPlan, getPlanByMap, getSubscriptionPlans, getUserPlan, insertPlanMapping, insertPlanMappingDraft, rechargePlanMapping, startPlanMapping } from "../controllers/planController.js";
import { authenticateToken } from "../controllers/login.js";
import { getSubscriptionPlanById } from "../controllers/planController.js";
import { decodeToken } from "../controllers/login.js";
import { addGymImage, addMembershipPlan, changeGymInfo, changeGymPp, checkGymAdmin, countData, deleteGymImage, deleteMembershipPlan, getAllGyms, getFeatures, getGymAdminFeatures, getGymAdminWorkouts, getGymTransactions, getMemberships, getMyGyms,  getNotif, getSaved, getUserSavedGyms, getWorkouts, insertGym, saveGym, searchGyms, setGymVerified, updateGymAdminFeature, updateGymAdminWorkout, updateMembershipPlan } from "../controllers/gymController.js"; // New controller for gym registration
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
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  }
});

const upload = multer({ storage: storage });

// Route for gym registration with file handling (images)
router.post('/register-gym', upload.fields([
  { name: 'gymImages', maxCount: 10 },
  { name: 'gymProfileImage', maxCount: 1 },
  { name: 'gymLicense', maxCount: 1 }
]), insertGym);  // Call the controller function for gym registration

router.post('/notif/add', createNotif)

router.post('/admin/gym/set-verified', setGymVerified)
// SIGN UP
router.post('/register', insertUser);

// OTP
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// LOGIN
router.post('/login', userLogin);
router.post('/user-token', findUserFromToken);
// google login
router.post('/api/auth/google', googleLogin)

// USERS
router.get('/admin/users', getAllUsers)
router.delete('/user/:email', delUserByEmail)

// decode token
router.post('/decode-token', decodeToken);

// gym
router.get('/gyms', getGyms);
router.get('/gyms/:id', getGymById);
router.get('/admin/gyms', getAllGyms)
// saved
router.post('/save-gym', saveGym)
router.get('/user-saved/:userId', getSaved)
router.get('/gyms/saved/:userId', getUserSavedGyms)
// gym owned
router.get('/user/gyms/:userId', getMyGyms)

// notification
router.get('/user/notif/:userId', getNotif)
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
// router.post('/insert-plan/draft', insertPlanMappingDraft)
router.post('/plan-mapping/recharge/:planMapId', rechargePlanMapping)
router.get('/plan-mapping/plan/:planMapId', getPlanByMap)

router.get('/user/plans/:userId', getUserPlan)

// FEATURES
router.get('/features', getFeatures)

// WORKOUTS
router.get('/workouts', getWorkouts)

// QR CODE
router.get('/check-plan/:planMapId', checkPlan);


// gym search
router.get('/search-gyms', searchGyms)

// gymadmin
router.get('/gym-admin/gym/:gymId/:ownerId', checkGymAdmin)
router.get('/gym-admin/members/:gymId', getAllGymMembers)
router.get('/gym-admin/memberships/:gymId', getMemberships)
router.post('/gym-admin/add-gym', upload.fields([
  { name: 'gymImages', maxCount: 10 }
]), addGymImage)
router.put('/gym-admin/edit-profile-pic/:gymId', upload.fields([
  { name: 'pp', maxCount: 1 }
]), changeGymPp)
router.put('/gym-admin/change-gym-info/:gymId', changeGymInfo)

router.get('/gym-admin/transactions/:gymId', getGymTransactions)

router.delete('/gym-admin/delete-image/:imageId/:gymId', deleteGymImage)
router.get('/gym-admin/workouts/:gymId', getGymAdminWorkouts)
router.get('/gym-admin/features/:gymId', getGymAdminFeatures)
router.post('/gym-admin/update-gym-feature/:gymFeatureId/:gymId', updateGymAdminFeature)
router.post('/gym-admin/update-gym-workout/:gymWorkoutId/:gymId', updateGymAdminWorkout)
router.post('/gym-admin/add-membership-plan/:gymId', addMembershipPlan)
router.post('/gym-admin/update-membership-plan/:planId', updateMembershipPlan)
router.delete('/gym-admin/delete-membership-plan/:planId', deleteMembershipPlan)
router.get('/gym-admin/dashboard/:gymId', countData)
export default router;
