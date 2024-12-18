
import express from "express";

import db from './config/db.js'
import sequelize from "./config/db.js";
import { Gym } from "./models/Gym.js";
import { User } from "./models/User.js";
import { GymLocation } from "./models/Gym.js";
import { Plan } from "./models/Gym.js";
import { PlanMapping } from "./models/Plans.js";
import { Transaction } from "./models/Transaction.js";
import { Platform } from "./models/Platform.js";


import { OTP } from "./models/OTP.js";
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import router from "./routes/routes.js";
import cors from 'cors';
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();



const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Use the CORS middleware globally
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());
app.use(router);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))





// Synchronize the database
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(3000, () => console.log("Listening at port 3000"));
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });



app.get('/', async (req, res) => {
  try {
    res.send("hello")
  } catch (err) {
    res.send(err)
  }

})

