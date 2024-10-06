
import express from "express";
import path from 'path';
import db from './config/db.js'
import sequelize from "./config/db.js";
import { Gym } from "./models/Gym.js";
import User from "./models/User.js";
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import router from "./routes/routes.js";
import cors from 'cors';

const app = express();



const corsOptions = {
    origin: 'http://localhost:5173',   
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    credentials: true,                 
  };
  
  // Use the CORS middleware globally
  app.use(cors(corsOptions));
  
  // Middleware to parse JSON requests
  app.use(express.json());
  app.use(router);


app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

// Synchronize the database
sequelize.sync({ force: false })
  .then(() => {
    app.listen(3000, () => console.log("Listening at port 3000"));
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });



app.get('/', async (req, res)=>{
    try{
        res.send("hello")
    }catch(err){
        res.send(err)
    }
    
})
