
import express from "express";
import path from 'path';
import db from './config/db.js'

import { Gym } from "./models/Gym.js";

const app = express();



app.listen(3000, ()=>console.log("Listening at port 3000"))

app.get('/', async (req, res)=>{
    try{
        const gyms = await Gym.find({})
        res.json(gyms)
    }catch(err){
        res.send(err)
    }
    
})
