const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const ExpressError = require("./utils/expressError");
const listingRouter=require("./router/listingRouter");
const reviewRouter = require("./router/reviewRouter");
const userRouter = require("./router/userRouter");
const session=require("express-session");
const flash=require("connect-flash");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");



// Database Connection
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderstay");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
main();

// ============================================================
// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/boilerplate");
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session({
  secret: "#Ashish1234@",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now()+1000*60*60*24*3,
    maxAge:1000*60*60*24*3,
    httpOnly:true
  }
}))
app.use(flash());



app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currentUser=req.user;
  next();
})


// ======================listing Router=================================================================
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/user",userRouter);



// Error Handler Middleware
app.use((err, req, res, next) => {
  console.log(err);
  const code = err.code || 500;
  const message = err.message || "Something went wrong!";
  res.status(code).render("views/error",{code,message});
});

// ============================================================
// Server
app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});


