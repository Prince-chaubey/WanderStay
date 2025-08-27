const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/userController");

const userRouter = express.Router();

// Register User
userRouter.post("/register", wrapAsync(userController.registerUser));

// Login User
userRouter.post("/login", wrapAsync(userController.loginUser));

// Logout User
userRouter.get("/logout", userController.logoutUser);

// Signup Form for User
userRouter.get("/signup", userController.getSignupForm);

// Login Form for User
userRouter.get("/login", userController.getLoginForm);

// Debug 
userRouter.get("/find", wrapAsync(userController.findUsers));

module.exports = userRouter;
