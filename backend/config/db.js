
// import mongoose from "mongoose"

// const db = mongoose.connect('mongodb://localhost:27017/gymApp')
// .then(()=>console.log("MongoDB connected successfully..."))
// .catch(e=>console.log("Error connection to DB: ", e))

// export default db;
import dotenv from 'dotenv'

dotenv.config();
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbType = process.env.DB_TYPE;
const dbHost = process.env.DB_HOST;
import { Sequelize } from 'sequelize';


// Create a new Sequelize instance (replace the values with your actual credentials)
const sequelize = new Sequelize(dbName, dbType, dbPassword, {
  host: dbHost,  // or your database server address
  dialect: 'postgres', // The database you're connecting to
  logging: false, // Set to 'true' if you want to see SQL logs in the console
});


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
