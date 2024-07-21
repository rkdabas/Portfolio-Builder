import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("avatar and resume are required", 400));
  }
  const { avatar } = req.files;
  // console.log("avatar", avatar);

  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "AVATARS" }
  );
  if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.log(
      "Cloudinary Error:",
      cloudinaryResponseForAvatar.error || "unknown cloudinary error"
    );
  }

  const { resume } = req.files;
  // console.log("resume", resume);

  const cloudinaryResponseForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "RESUME" }
  );
  if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.log(
      "Cloudinary Error:",
      cloudinaryResponseForResume.error || "unknown cloudinary error"
    );
  }

  const {
    fullName,
    email,
    phone,
    password,
    aboutMe,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    leetcodeURL,
    linkedInURL,
    codeforcesURL,
    codechefURL,
    gfgURL,
  } = req.body;

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    aboutMe,
    githubURL,
    linkedInURL,
    leetcodeURL,
    instagramURL,
    portfolioURL,
    twitterURL,
    codeforcesURL,
    codechefURL,
    gfgURL,
    avatar: {
      public_id: cloudinaryResponseForAvatar.public_id,
      url: cloudinaryResponseForAvatar.secure_url,
    },
    resume: {
      public_id: cloudinaryResponseForResume.public_id,
      url: cloudinaryResponseForResume.secure_url,
    },
  });

  generateToken(user, "user registered", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("email and password are required"));
  }

  const user = await User.findOne({ email }).select("password");
  if (!user) {
    return next(new ErrorHandler("invalid email or password"));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(
      new ErrorHandler(
        "password don't match, either email is wrong or password is wrong"
      )
    );
  }
  generateToken(user, "logged in", 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "logged out successfully",
    });
});
// this getUser is for dashboard so authentication is required(only logged user can see his dashboard)
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioURL: req.body.portfolioURL,
    linkedInURL: req.body.linkednURL,
    twitterURL: req.body.twitterURL,
    instagramURL: req.body.instagramURL,
    githubURL: req.body.githubURL,
    leetcodeURL: req.body.leetcodeURL,
    codeforcesURL: req.body.codeforcesURL,
    codechefURL: req.body.codechefURL,
    gfgURL: req.body.gfgURL,
  };

  // updating avatar
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const avatarId = user.avatar.public_id;
    await cloudinary.uploader.destroy(avatarId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      {
        folder: "AVATARS",
      }
    );
    newUserData.avatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  // updating resume
  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeId = user.resume.public_id;
    await cloudinary.uploader.destroy(resumeId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath,
      {
        folder: "RESUME",
      }
    );
    newUserData.resume = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  // updating other updated info(fullname,phone etc) of that user in schema
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "profile updated successfully",
    user,
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("please fill all fields", 400));
  }
  const user = await User.findById(req.user.id).select("password");
  const isPasswordMatch = await user.comparePassword(currentPassword);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("incorrect current password", 400));
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("new password and confirm password don't match"),
      400
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "password updated",
  });
});

// getUser for portfolio frontend where anyone can see it , no login/authentication required
export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "669d01155a7488060410676e";
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});

// function to sent email with jwt token for forgot password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found!", 404));
  }
  const resetToken = user.resetPasswordToken();
  await user.save({ validateBeforeSave: true });
  const resetPasswordURL = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
  const message = `Your reset password is:-\n\n ${resetPasswordURL} \n\n If you have not requested for this please ignore it.`;
  // sending email to logged in user with link/token for resetting password
  try {
    await sendEmail({
      email: user.email,
      subject: "portfolio recovery password",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    return next(new ErrorHandler(err.message, 500));
  }
});

// function to reset the password using jwt token we sent in email in previous function
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("reset password token is invalid or has expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password and confirm password don't match"));
  }
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  // now password is reset so login the user again
  generateToken(user, "reset password successfully", 200, res);
});
