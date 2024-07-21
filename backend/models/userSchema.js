import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"; // by-default available in nodejs
import { type } from "os";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "name required"],
  },
  email: {
    type: String,
    required: [true, "email required"],
  },
  phone: {
    type: String,
    required: [true, "phone number required"],
  },
  aboutMe: {
    type: String,
    required: [true, "About me field is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "password must be atleat 8 char long"],
    select: false, // so that password can't be retrieved/get of user from schema
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioURL: {
    type: String,
    // required: [true, "Portfolio URL Required!"],
  },
  githubURL: {
    type: String,
  },
  instagramURL: {
    type: String,
  },
  twitterURL: {
    type: String,
  },
  linkedInURL: {
    type: String,
  },
  leetcodeURL: {
    type: String,
  },
  gfgURL: {
    type: String,
  },
  codeforcesURL: {
    type: String,
  },
  codechefURL: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// hashing the password before saving it into DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// it compares saved hashed password in DB with enetered password by user
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generating json web token
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
