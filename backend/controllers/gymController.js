import { Gym, GymFeature, GymWorkout, GymWorkoutMapping, GymOpeningHours, GymLocation, GymImages } from "../models/Gym.js";
import { User } from "../models/User.js";
import { Plan } from "../models/Gym.js";
import sequelize from "../config/db.js";
import { GymFeatureMapping } from "../models/Gym.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // To check if the folder exists
import { PlanMapping } from "../models/Plans.js";


// Define storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        // Check if the directory exists, if not create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
    }
});

// Multer instance to handle uploads
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPG and PNG files are allowed'), false);
        }
        cb(null, true);
    }
}).fields([
    { name: 'gymImages', maxCount: 5 }, // Handle up to 5 gym images
    { name: 'gymProfileImage', maxCount: 1 } // Handle 1 profile image
]);

// Route handler using multer for parsing multipart form-data
export const insertGym = async (req, res) => {
    try {
        // Extract gym data from the request
        console.log("hello")
        const gymData = await JSON.parse(req.body.gymData);

        console.log(gymData)
        // Retrieve uploaded files (images)
        const gymImages = req.files.gymImages || [];
        const gymProfileImage = req.files.gymProfileImage ? req.files.gymProfileImage[0] : null;

        const gymImagePaths = gymImages.map(img => `/uploads/${img.filename}`);  // Store paths of gym images
        const gymProfileImagePath = gymProfileImage ? `/uploads/${gymProfileImage.filename}` : null;  // Store profile image path

        console.log("Image Paths: ", gymImagePaths, " ", gymProfileImagePath);

        const newGym = await Gym.create({
            gymName: gymData.name,
            gymPhone: gymData.contact,
            gymEmail: gymData.email,
            ownerId: req.body.ownerId,
            profileImage: gymProfileImagePath,
            status: 'unverified'

        })

        const gymId = newGym.id;


        const newPlan1 = await Plan.create({
            planName: gymData.membershipPlans.plan1.title,
            planDescription: gymData.membershipPlans.plan1.description,
            duration: gymData.membershipPlans.plan1.duration,
            price: gymData.membershipPlans.plan1.price,
            planType: 'membership',
            gymId: gymId,
            state: 'active'


        })

        const plan2 = gymData.membershipPlans.plan2;

        if (!plan2.title || !plan2.description || !plan2.duration || !plan2.price) {
            // return res.json({ message: 'fill the others' })
        } else {


            const newPlan2 = await Plan.create({
                planName: plan2.title,
                planDescription: plan2.description,
                duration: plan2.duration,
                price: plan2.price,
                planType: 'membership',
                gymId: gymId,
                state: 'active'

            })
        }
        const plan3 = gymData.membershipPlans.plan3;

        if (!plan3.title || !plan3.description || !plan3.duration || !plan3.price) {
            // return res.json({ message: 'fill the others' })
        }
        else {



            const newPlan3 = await Plan.create({
                planName: plan3.title,
                planDescription: plan3.description,
                duration: plan3.duration,
                price: plan3.price,
                planType: 'membership',
                gymId: gymId,
                state: 'active'

            })
        }

        const features = gymData.features

        for (const feature of features) {
            try {
                console.log(feature)
                await GymFeatureMapping.create({
                    gymId: gymId,
                    gymFeatureId: feature
                });
                console.log(`Feature ${feature} added successfully.`);
            } catch (error) {
                console.error(`Error adding feature ${feature}:`, error);
            }
        }

        const workouts = gymData.workouts
        for (const workout of workouts) {
            try {
                console.log(workout)
                await GymWorkoutMapping.create({
                    gymId: gymId,
                    gymWorkoutId: workout
                });
                console.log(`Workout ${workout} added successfully.`);
            } catch (error) {
                console.error(`Error adding feature ${workout}:`, error);
            }
        }

        const morning = `${gymData.openingHours.morning.start}am - ${gymData.openingHours.morning.end}am`
        const evening = `${gymData.openingHours.evening.start}pm - ${gymData.openingHours.evening.end}pm`


        const newOpeningHour = await GymOpeningHours.create({
            gymId,
            morning,
            evening
        })

        const location = gymData.location

        const newLocation = await GymLocation.create({
            buildingNo: location.buildingNo,
            latitude: location.lat,
            longitude: location.lng,
            area: location.area,
            city: location.city,
            landmark: location.landmark,
            gymId
        })

        for (const img of gymImagePaths) {
            try {
                console.log(img)
                await GymImages.create({
                    gymId,
                    gymImgPath: img
                });
                console.log(`Workout ${img} added successfully.`);
            } catch (error) {
                console.error(`Error adding feature ${img}:`, error);
            }

        }






        // lat: 23.738008375,
        //     lng: 92.70682112499999,
        //     buildingNo: 'asfsaf',
        //     area: 'asfasf',
        //     city: 'asfasf',
        //     landmark: 'asfasf'
        // Construct the gym entry data with file paths
        //   const newGym = await Gym.create({
        //     name: gymData.name,
        //     email: gymData.email,
        //     contact: gymData.contact,
        //     address: gymData.address,
        //     ownerName: gymData.ownerName,
        //     ownerEmail: gymData.ownerEmail,
        //     location: gymData.location,
        //     openingHours: gymData.openingHours,
        //     membershipPlans: gymData.membershipPlans,
        //     features: gymData.features,
        //     workouts: gymData.workouts,
        //     gymImages: gymImages.map(img => img.path), // Save paths of gym images
        //     gymProfileImage: gymProfileImage ? gymProfileImage.path : null, // Save profile image path
        //     ownerId: req.body.ownerId // Store the ownerId from the form
        //   });

        // Send success response with created gym data
        //   res.status(201).json({ message: "Gym registered successfully", gym: newGym });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register gym", details: err.message });
    }
};

export const getGyms = async (req, res) => {
    try {
        const gyms = await Gym.findAll({
            include: [
                { model: GymLocation },
                { model: Plan }
            ]
        });
        res.status(200).json(gyms);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getGymById = async (req, res) => {
    try {
        const gym = await Gym.findOne({ where: { id: req.params.id } });
        if (!gym) {
            return res.status(404).json({ message: 'Gym not found' });
        }
        res.status(200).json(gym);
    } catch (err) {
        res.status(400).json(err);
    }
};

// const insertGymFeature = async ()=>{
//     const newFeat = await  GymFeature.create({
//         featureName: 'cardio',
//         featureImgPath: 'asfsafsaf'
//     })
// }

// insertGymFeature()
// insertGymFeature()

// const insertGymWorkout = async ()=>{
//     const newFeat = await  GymWorkout.create({
//         workoutName: 'sdgsdgsdg'
//     })
// }

// insertGymWorkout()
// insertGymWorkout()
