import { userModel } from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

const createUser= async(req,res)=>{
    const {username,password,email,role}=req.body;
    console.log(username,password,email);
    const exists=await userModel.findOne({username:username});
    try{
        if(exists===null){
            const hashedpassword=await bcrypt.hash(password,10);
            const user={
                username:username,
                password:hashedpassword,
                email:email,
                role:role,
            }
            const create=await userModel.create(user);
            console.log(create)
            res.status(201).json({
                message:"User Registered Successfully."
            })
        }
        else{
            throw new Error(`username already exists`,400)
        }
    }
    catch(err){
        res.status(500).json({
            message:err
        })
    }
}

const loginUser=async(req,res)=>{
    const {username,password}=req.body;
    const exists=await userModel.findOne({username:username});
    try{
        if(exists){
            if(await bcrypt.compare(password,exists.password)){
                const accessToken=jwt.sign({
                    username:username,
                    password:password,
                },process.env.SECRET,{expiresIn:"2m"})
                const refreshToken=jwt.sign({
                    username:username,
                    password:password,
                },process.env.REFRESH_SECRET,{expiresIn:'10m'});
                res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'lax', 
                maxAge: 1 * 60 * 1000, 
                path: '/'
                });
                
                res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'lax', 
                maxAge: 3*60*1000,
                path: '/'
                });
                
                res.status(200).json({
                    messsage:"Logged-In Successfully"
                });
            }
            else{
                throw new Error('Password Incorrect. Try Again.',400);
            }
        }
        else{
            throw new Error('User does not Exist');
        }
    }
    catch(err){
        res.status(500).json({
            message:err
        });
    }
}

const veri=(req,res)=>{
    res.status(200).json({
        message:`you are a registered user ${req.user.username}`
    })
}

const admin=(req,res)=>{
    res.status(200).json({
        message:"you are admin"
    })
}

const manager=(req,res)=>{
    res.status(200).json({
        message:"you are manager"
    })
}

const user=(req,res)=>{
    res.status(200).json({
        message:"you are user"
    })
}

export {createUser,loginUser,veri,admin,manager,user};