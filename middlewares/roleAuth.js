import { userModel } from "../models/userModel.js";
const authRoles=(...allowedRoles)=>{
    return async(req,res,next)=>{
        const user=await userModel.find({username:req.user.username});
        
        if(!allowedRoles.includes(user[0].role)){
            return res.status(401).json({
                message:"Access Denied"
            });
        }
        next();
    }
}

export default authRoles;