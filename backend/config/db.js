
// import mongoose from "mongoose"

// const db = mongoose.connect('mongodb://localhost:27017/gymApp')
// .then(()=>console.log("MongoDB connected successfully..."))
// .catch(e=>console.log("Error connection to DB: ", e))

// export default db;

import { Sequelize } from 'sequelize';
// Import 'dotenv' and call its config() method
import dotenv, { config } from 'dotenv';

// Load the environment variables
dotenv.config();

const dbPassword = process.env.DB_PASSWORD
// Create a new Sequelize instance (replace the values with your actual credentials)
const sequelize = new Sequelize('gym_app', 'postgres', dbPassword, {
  host: 'localhost',  // or your database server address
  dialect: 'postgres', // The database you're connecting to
  logging: false, // Set to 'true' if you want to see SQL logs in the console
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
