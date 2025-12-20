import express from "express";
import { 
  registerUser, 
  loginUser, 
  logout, 
  googleLogin, 
  getUserDetails, 
  forgotPassword,
  resetPassword
} from "../controllers/userController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post("/auth/google",googleLogin)
router.get('/logout',logout)
router.get('/me',isAuthenticatedUser,getUserDetails)
router.get("/admin",isAuthenticatedUser,authorizeRoles("admin"),(req,res)=>{
    res.send("Admin Route Access Granted");
});
router.get("/manager",isAuthenticatedUser,authorizeRoles("admin","manager"),(req,res)=>{
    res.send("Manager Route Access Granted");
});
router.get("/user",isAuthenticatedUser,authorizeRoles("admin","manager","user"),(req,res)=>{
    res.send("All users");
});
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword)
export default router; 