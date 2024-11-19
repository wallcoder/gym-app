import sequelize from "./config/db.js";
import { GymFeature, GymWorkout } from "./models/Gym.js";
import { UserRole } from "./models/User.js";
const admin  = async()=>{
    try{
        const seed = await UserRole.bulkCreate([{roleName: 'admin', roleDescription: 'GymPass Admin'},{roleName: 'gym-admin', roleDescription: 'Gym Admin'}])
    }catch(err){
        console.log(err)
    }
}
admin()
const seedWorkout = async () => {
    try {
        const seed = await GymWorkout.bulkCreate([
            { workoutName: 'Weightlifting' },
            { workoutName: 'Cardio' },
            { workoutName: 'Strength Training' },
            { workoutName: 'High-Intensity Interval Training (HIIT)' },
            { workoutName: 'Endurance Training' },
            { workoutName: 'Flexibility Training' },
            { workoutName: 'Core Workouts' },
            { workoutName: 'Balance Training' },
            { workoutName: 'Bodybuilding' },
            { workoutName: 'Circuit Training' },
            { workoutName: 'Aerobics' },
            { workoutName: 'Plyometrics' },
            { workoutName: 'Yoga' },
            { workoutName: 'Pilates' },
            { workoutName: 'CrossFit' },
            { workoutName: 'Functional Training' },
            { workoutName: 'Powerlifting' },
            { workoutName: 'Mobility Workouts' },
            { workoutName: 'Agility Training' },
            { workoutName: 'Speed Training' }
        ])
    } catch (err) {
        console.log(err)
    }
}


const seedFeature = async () => {
    try {
        const seed = await GymFeature.bulkCreate([
            { featureName: 'Free Weights' },
            { featureName: 'Cardio Machines' },
            { featureName: 'Personal Training' },
            { featureName: 'Yoga Classes' },
            { featureName: 'Swimming Pool' },
            { featureName: 'Sauna' },
            { featureName: 'Locker Rooms' },
            { featureName: 'Climbing Wall' },
            { featureName: 'CrossFit Area' },
            { featureName: 'Boxing Area' },
            { featureName: 'Spin Classes' },
            { featureName: 'Outdoor Track' },
            { featureName: 'Massage Therapy' },
            { featureName: 'Group Fitness Classes' },
            { featureName: 'Hydrotherapy Pool' },
            { featureName: 'Physical Therapy' },
            { featureName: 'Parking' },
            { featureName: 'Air Conditioning' },
            { featureName: 'Free WiFi' }
        ])
    } catch (err) {
        console.log(err)
    }
}
// seedWorkout()
// seedFeature()