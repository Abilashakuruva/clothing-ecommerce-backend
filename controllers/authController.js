
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv=require('dotenv');

dotEnv.config();

const secretKey=process.env.WhatIsYourName


const userRegister = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
        console.log('registered')

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }

}

const userLogin=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error:"Invalid name or password"})
        }
        const token= jwt.sign({userId:user._id},secretKey,{expiresIn:"1h"})
        
        const userId=user._id;        

        res.status(200).json({success:"Login successful",token, userId})
        console.log(email,"this is token",token);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: "Internal server error" })       
        
    }
}

const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find();
        res.json({users})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: "Internal server error" })  
        
    }
}




module.exports= {userRegister,userLogin,getAllUsers}