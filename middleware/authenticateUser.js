const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const authenticateJWT = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1]; 
    if (!token) {
      req.flash("error", "Please login first!");
      return res.redirect("/user/login");
    }

    // Verify JWT
    const decoded = jwt.verify(token, "##SECRET123##");

    // Fetch user from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      req.flash("error", "User not found, please login again.");
      return res.redirect("/user/login");
    }

    // Attach user to request (like passport does)
    req.user = user;
    res.locals.user = user;  // so you can use in EJS templates

    next();
  } catch (err) {
    console.error(err);
    req.flash("error", "Session expired, please login again.");
    res.redirect("/user/login");
  }
};


module.exports=authenticateJWT;