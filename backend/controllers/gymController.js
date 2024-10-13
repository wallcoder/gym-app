import { Gym } from "../models/Gym.js";
import { User } from "../models/User.js";
import sequelize from "../config/db.js";

export const insertGym = async (req, res) => {
    const data = req.body;
    
    try {
        const newGym = Gym.create({
            gymName: data.name,
            gymPhone: data.contact,
            gymEmail: data.email,
            ownerId: data.ownerId,
            status: 'unverified'

        })
        res.json(newGym);
    }catch(err){
        res.json(err)
    }
}

export const getGyms = async (req, res)=>{
    try{
        console.log("CALLED")
        const gyms = await Gym.findAll();
        console.log(gyms)
        res.status(200).json(gyms);
    }catch(err){
        res.status(400).json(err);
    }
}


export const getGymById = async (req, res)=>{
    try{
        const gym = await Gym.findOne({where: {id: req.params.id}})
        if(!gym){
            res.json({message: 'gym not found'});
        }
        res.status(200).json(gym)
    }catch(err){
        res.status(400).json(err);
    }
}