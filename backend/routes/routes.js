import express from "express";
import { insertUser } from "../controllers/userController.js";
const router = express.Router();

router.post('/register', insertUser)
router.get('/hello', (req, res)=>{
    console.log("helloeeee");
    res.send("helloo")
})

export default router;