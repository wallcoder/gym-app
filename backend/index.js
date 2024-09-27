import mongoose from "mongoose";
import express from "express";
import path from 'path';

const app = express();

mongoose.connect('mongodb://localhost:27017/gymApp')
.then(()=>console.log("MongoDB connected successfully..."))
.catch(e=>console.log("Error connection to DB: ", e))


app.listen(3000, ()=>console.log("Listening at port 3000"))

app.get('/', (req, res)=>{
    res.send("hellloooo")
})
