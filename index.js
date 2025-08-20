const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

const allListing = require("./Models/allListing");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/expressError");
const listingSchema = require("./validateListing");

const app = express();

// -------------------- Database Connection --------------------
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

// -------------------- Middleware --------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/boilerplate");

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const validateListingMiddleware=(req,res,next)=>{
   let {err}=listingSchema.validate(req.body);
   if(err){
    throw new ExpressError(400,err);
   }
   else{
    next();
   }
}
// -------------------- Routes --------------------

// Home - All Listings
app.get("/listings", wrapAsync(async (req, res) => {
  const listings = await allListing.find({});
  res.render("views/index", { listings });
}));

// New Listing Form
app.get("/listings/new", (req, res) => {
  res.render("views/newListing");
});

// Save New Listing
app.post("/listings/new",
  validateListingMiddleware,
  wrapAsync(async (req, res) => {
  const newListing = new allListing(req.body);
  await newListing.save();
  res.redirect("/listings");
}));

// Show a Particular Listing
app.get("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await allListing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing not found");
  res.render("views/show", { listing });
}));

// Edit Listing Form
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await allListing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing not found");
  res.render("views/editListing", { listing });
}));

// Update Listing
app.put("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const updatedListing = await allListing.findByIdAndUpdate(
    id,
    req.body,
    { runValidators: true, new: true }
  );
  if (!updatedListing) throw new ExpressError(404, "Listing not found");
  res.redirect(`/listings/${id}`);
}));

// Delete Listing
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const deleted = await allListing.findByIdAndDelete(id);
  if (!deleted) throw new ExpressError(404, "Listing not found");
  res.redirect("/listings");
}));


// -------------------- 404 Catch-All --------------------
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// -------------------- Error handler Middleware ----------
app.use((err, req, res, next) => {
  const code = err.code || 500;
  const message = err.message || "Something went wrong!";
  res.status(code).render("views/error", { code, message }); 
});

// -------------------- Server --------------------
app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
