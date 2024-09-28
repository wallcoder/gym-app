
import mongoose from "mongoose"

const db = mongoose.connect('mongodb://localhost:27017/gymApp')
.then(()=>console.log("MongoDB connected successfully..."))
.catch(e=>console.log("Error connection to DB: ", e))

export default db;