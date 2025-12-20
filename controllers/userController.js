import ErrorHander from "../utils/errorhander.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/userModel.js"; // FIXED: Default Import
import sendToken from "../utils/jwtToken.js";
import { OAuth2Client } from "google-auth-library";
import sendEmail from "../utils/sendMail.js";
import crypto from "crypto"; // Native Node module for random bytes

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 1. Register User (Standard Email/Password)
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password,role } = req.body;

  // FIXED: Usage is User.create, not create()
  const user = await User.create({
    name,
    email,
    password,
    role: role?role :"user",
    avatar: {
      public_id: "local_avatar",
    },
    loginMethod: "email_password"
  });

  sendToken(user, 201, res);
});

// 2. Login User (Standard)
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email and Password", 400));
  }

  // FIXED: Usage is User.findOne
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  // CRITICAL LOGIC: Check if user is a Google-only user
  if (!user.password) {
      
      const resetToken=user.getResetPasswordToken();
      await user.save({validateBeforeSave:false});

      const resetUrl = `http://localhost:5173/password/reset/${resetToken}`;
      const message = `It seems you have registered using Google Login. To set a password for email/password login, please use the following link to reset your password:- \n\n ${resetUrl} \n\nIf you have not requested this email then, please ignore it.`;
      try{
        await sendEmail({
          email:user.email,
          subject:`Set Your Password for Email/Password Login`,
          message,
        });
        res.status(200).json({
          message:"Since You are a Google Login user, a password setup link has been sent to your email.",
        })
      }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return new ErrorHander(error.message, 500);
      }
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// 3. Google Login
export const googleLogin = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (user) {
        sendToken(user, 200, res);
    } else {
        user = await User.create({
            name,
            email,
            password: null,
            avatar: {
                public_id: "google_avatar",
                url: picture,
            },
            role: "user",
            loginMethod: "google"
        });

        sendToken(user, 201, res);
    }
});

// 4. Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// 5. Get User Details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get Reset Token (Defined in Model)
  const resetToken = user.getResetPasswordToken();
  await user.save({validateBeforeSave:false});
  // Save token to DB
  // Create Reset URL (Frontend URL)
  // Note: 'localhost:3000' should match your FRONTEND URL
  const resetUrl = `http://localhost:5173/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    // If email fails, clear the token from DB
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return new ErrorHander(error.message, 500);
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash the token from URL to compare with DB
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // Check if not expired
  });

  if (!user) {
    return next(
      new ErrorHander("Reset Password Token is invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not match", 400));
  }

  // Set new password
  user.password = req.body.password;
  
  // Clear reset tokens
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save(); // Model "pre save" will hash the password automatically

  sendToken(user, 200, res);
});