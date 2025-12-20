import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const verifyUser=async(req,res,next)=>{
    // let auth=req.headers.Authorization || req.headers.authorization
    // //console.log(auth)
    // const token=auth.split(" ")[1];
    //console.log(token);
    const token=req.cookies.accessToken;
    if(!token){
        return res.sendStatus(401);
    }
    try{
        const decode=jwt.verify(token,process.env.SECRET);
        req.user=decode;
        //console.log(decode);
        next();
    } 
    catch(err){
        next(err);
    }
}

export {verifyUser};