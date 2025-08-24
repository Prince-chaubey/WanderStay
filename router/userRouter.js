const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");


const userRouter = express.Router();

//To register the user 
userRouter.post("/register", wrapAsync(async (req, res) => {
    const { username, email, password } = req.body;

    const found = await User.findOne({ email });

    if (found) {
        req.flash("error", `User already exists, Please Login!`);
        return res.redirect("/user/login");
    }

    //hashing the password
    const hashedPassword=await bcrypt.hash(password,10);

    //create a new user
    const newUser=new User({
        username,
        email,
        password:hashedPassword
    });

    await newUser.save();
     // generate JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      "##SECRET123##",
    );

     res.cookie("token", token, {
      httpOnly: true, 
      secure: false,
      maxAge: 3600000 
    });

    req.flash("success", `${username} registered successfully !`);
    res.redirect("/user/login");
}))

//To login the user 
userRouter.post("/login", wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    // checking if the user exists or not
    const user = await User.findOne({ email });
    if (!user) {
        req.flash("error", `No account found for "${email}". Create an account to continue.`);
        return res.redirect("/user/signup");
    }

    // comparing the current password and stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        req.flash("error", "Invalid credentials");
        return res.redirect("/user/login");
    }

    // generate jwt
    const token = jwt.sign(
        { id: user._id, email: user.email },
        "##SECRET123##",
        { expiresIn: "1h" }
    );

    
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000
    });
    
   
    req.flash("success", `${email} Logged in successfully!`);
    res.redirect("/listings");
}));

//To logout the user
userRouter.get("/logout", (req, res) => {
  const token = req.cookies.token;

  if (token) {
    res.clearCookie("token");
    req.flash("success", "You have been logged out successfully.");
  } else {
    req.flash("error", "You are not logged in.");
  }

  res.redirect("/listings");
});

//To render the signup form
userRouter.get("/signup", (req, res) => {
    res.render("views/signUp");
})

//To render the login form
userRouter.get("/login", (req, res) => {
    res.render("views/login");
})


module.exports = userRouter;