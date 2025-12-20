import mongoose from "mongoose";
import validator from "validator"; // FIXED: Import default object
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    // REQUIRED is FALSE so Google users don't fail validation
    required: false, 
    minLength: [8, "Password should be greater than 8 characters"],
    select: false, // Don't return password in queries by default
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
      default: "default_id" 
    },
    url: {
      type: String,
      required: true,
      default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fprofile-image-placeholder&psig=AOvVaw3grLWWWFTk3-MxPG_SdUGN&ust=1765542319104000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNix4fTDtZEDFQAAAAAdAAAAABAE" 
    },
  },
  role: {
    type: String,
    enum: ["user", "admin","manager"],
    default: "user", 
  },
  loginMethod: {
      type: String,
      enum: ["email_password", "google"],
      default: "email_password"
  },
  
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 1. Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return
  }
  if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
  }
});

// 2. JWT Token Generator
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// 3. Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) return false; 
  return await bcrypt.compare(enteredPassword, this.password);
};

// 4. Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// ESM Export
export default mongoose.model("User", userSchema);