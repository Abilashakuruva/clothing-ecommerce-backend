
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const dotEnv=require('dotenv');

dotEnv.config()

const secretKey=process.env.WhatIsYourName

const verifyToken=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({error:"Token is required"});
    }

    const token = authHeader.split(" ")[1];


    try {
        const decoded=jwt.verify(token,secretKey)
        const user=await User.findById(decoded.userId);

        if(!user){
            return res.status(404).json({error:"user not found"})
        }

        req.userId=user._id;
        req.userEmail = user.email;

        next()

        
    } catch (error) {        
        console.error(error);
        return res.status(500).json({ error: "Invalid token" });
    }
}

module.exports=verifyToken;