const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");

// Register User
module.exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const found = await User.findOne({ email });
  if (found) {
    req.flash("error", "User already exists, Please Login!");
    return res.redirect("/user/login");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // generate token
  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    "##SECRET123##",
    { expiresIn: "1h" }
  );

  // set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
  });

  req.flash("success", `${username} registered successfully!`);
  res.redirect("/user/login");
};

// Login User
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    req.flash("error", `No account found for "${email}". Create an account to continue.`);
    return res.redirect("/user/signup");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    req.flash("error", "Invalid credentials");
    return res.redirect("/user/login");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    "##SECRET123##",
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
  });

  req.flash("success", `${email} Logged in successfully!`);
  res.redirect("/listings");
};

// Logout User
module.exports.logoutUser = (req, res) => {
  const token = req.cookies.token;

  if (token) {
    res.clearCookie("token");
    req.flash("success", "You have been logged out successfully.");
  } else {
    req.flash("error", "You are not logged in.");
  }

  res.redirect("/listings");
};

// Render Signup Form
module.exports.getSignupForm = (req, res) => {
  res.render("views/signUp");
};

// Render Login Form
module.exports.getLoginForm = (req, res) => {
  res.render("views/login");
};

// Debug: Get All Users
module.exports.findUsers = async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.json(users);
};

