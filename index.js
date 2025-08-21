const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const ExpressError = require("./utils/expressError");
const listingRouter=require("./router/listingRouter");
const reviewRouter = require("./router/reviewRouter");

const app = express();


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

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));







// ======================listing Router=================================================================
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);



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
