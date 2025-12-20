import express from "express";
import mongoose from "mongoose"

const connect= async(url)=>{
    try{
        const con=await mongoose.connect(url);
        console.log("DataBase Connected");
    }catch(err){
        console.log(err);
    }
}

export default connect;