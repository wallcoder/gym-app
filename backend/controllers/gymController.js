import { Gym, GymFeature, GymWorkout, GymWorkoutMapping, GymOpeningHours, GymLocation, GymImages } from "../models/Gym.js";
import { User } from "../models/User.js";
import { Plan } from "../models/Gym.js";
import sequelize from "../config/db.js";
import { GymFeatureMapping } from "../models/Gym.js";
import { Op } from "sequelize";
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // To check if the folder exists
import { PlanMapping } from "../models/Plans.js";
import { encrypt } from "./paymentGateway.js";
import { insertApiKey } from "./paymentGateway.js";
import { Saved } from "../models/Gym.js";

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
        if (!newGym) {
            res.status(400).json({ message: 'error creating gym' })
        }

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

        if (!newPlan1) {
            res.status(400).json({ message: 'error creating plan 1' })
        }

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

        const enApi = encrypt(gymData.publicKey, gymData.secretKey)

        insertApiKey(enApi.encryptedData1, enApi.encryptedData2, enApi.key, enApi.iv, gymId)

        res.json({ message: 'successful operation' })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register gym", details: err.message });
    }
};
export const getAllGyms = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const offset = (page - 1) * limit;
        let term = req.query.term;

        // Prepare the search term for LIKE queries
        if (term) {
            term = isNaN(term) ? `%${term}%` : parseInt(term, 10);
        }

        // Define condition for Gym model based on term
        const gymCondition = term
            ? {
                [Op.or]: [
                    
                    { gymName: { [Op.iLike]: term } },
                    { gymPhone: { [Op.iLike]: term } },
                    { gymEmail: { [Op.iLike]: term } },
                    { status: { [Op.iLike]: term } },
                ],
            }
            : {};

        // Step 1: Count gyms based on gymCondition without including associations
        const totalItems = await Gym.count({ where: gymCondition });

        // Step 2: Fetch gyms with associations and pagination
        const gyms = await Gym.findAll({
            where: gymCondition,
            limit,
            offset,
            include: [
                {
                    model: GymLocation,
                    required: false,  // Allow gyms without locations
                    where: term
                        ? {
                            [Op.or]: [
                                { city: { [Op.iLike]: term } },
                                { landmark: { [Op.iLike]: term } },
                            ],
                        }
                        : {},
                },
                { model: User, required: false },
                {
                    model: GymFeatureMapping,
                    required: false,
                    include: [{ model: GymFeature, required: false }],
                },
                
                { model: GymImages, required: false },
            ],
        });

        const totalPages = Math.ceil(totalItems / limit);
        const currentPage = page;

        // Respond with paginated data
        res.json({
            allGyms: gyms,
            totalPages,
            currentPage,
            totalGyms: totalItems,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching gyms.' });
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

export const saveGym = async (req, res) => {
    const { gymId, userId } = req.params
    console.log("from save gym: ", gymId, userId)

    try {
        const newSaved = Saved.create({
            userId,
            gymId
        })

        if (!newSaved) {
            console.log("cannot save")
            res.json({ message: 'cannot save' })
        }


    } catch (err) {
        console.log(err)
    }
}

export const searchGyms = async (req, res) => {

    let { term, location } = req.query




    try {


        if (!term) {
            return res.json({ gyms: [] })
        }


        term = `%${term}%`


        const search = await Gym.findAll(

            // {
            //     include: [
            //         {
            //             model: GymLocation,
            //             where: { city: location }
            //         },


            //     ]
            // },
            {
                where: {
                    gymName: { [Op.iLike]: term }
                }
            }

        )
        console.log(search)

        res.status(200).json({ gyms: search })


    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }


}

export const getGymById = async (req, res) => {
    try {
        const gym = await Gym.findOne({
            where: { id: req.params.id },
            include: [{ model: GymLocation }, { model: GymOpeningHours }, { model: Plan },
            {
                model: GymFeatureMapping,
                include: [{
                    model: GymFeature

                }]
            },
            {
                model: GymWorkoutMapping,
                include: [{
                    model: GymWorkout
                }]
            },
            {
                model: GymImages
            },
            {
                model: Plan
            }

            ]
        });
        if (!gym) {
            return res.status(404).json({ message: 'Gym not found' });
        }
        res.status(200).json(gym);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getFeatures = async (req, res) => {
    try {

        const features = await GymFeature.findAll();
        if (!features) {
            res.status(400).json({ message: 'Features not available' })
        }
        res.status(200).json(features)
    } catch (error) {
        res.status(400).json(error)

    }
}

export const getWorkouts = async (req, res) => {
    try {

        const workouts = await GymWorkout.findAll();
        if (!workouts) {
            res.status(400).json({ message: 'Workouts not available' })
        }
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json(error)

    }
}

// const open = async()=>{
//     const newOpen = await GymOpeningHours.create({
//         morning: '6:00am - 9:00am',
//         evening: '7:00pm - 10:00pm',
//         gymId: 30

//     })
// }
// open()


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

// const insertMap = async ()=>{
//     const newMap = await GymFeatureMapping.create({
//         gymId: 30,
//         gymFeatureId: 3
//     })
// }

// const insertMapWork = async ()=>{
//     const newMap = await GymWorkoutMapping.create({
//         gymId: 30,
//         gymWorkoutId: 3
//     })
// }

// insertMap()
// insertMapWork()


// const insertPlan = async () => {
//     const newPlan = await Plan.bulkCreate([{

//         planName: "Listing Only",
//         planDescription: "List your gym on our app, with contact details displayed Member Registration will not be  processed through our app",
//         planType: "subscription",
//         price: 500,
//         state: "active",
//         duration: 1


//     },
//     {

//         planName: "Full Plan",
//         planDescription: "Our app will provide Gym Listing , membership registration and member management system.",
//         planType: "subscription",
//         price: 1200,
//         state: "active",
//         duration: 1


//     }])
// }

// insertPlan()

