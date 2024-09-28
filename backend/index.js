
import express from "express";
import path from 'path';
import db from './config/db.js'

const app = express();



app.listen(3000, ()=>console.log("Listening at port 3000"))

app.get('/', (req, res)=>{
    res.send("hellloooo")
})
