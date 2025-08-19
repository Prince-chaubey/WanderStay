const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

const allListing = require("./Models/allListing");

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

// -------------------- Routes --------------------

// Home - All Listings
app.get("/listings", async (req, res) => {
  const listings = await allListing.find({});
  res.render("views/index", { listings });
});


// New Listing Form
app.get("/listings/new", (req, res) => {
  res.render("views/newListing");
});


// Save New Listing
app.post("/listings/new", async (req, res) => {
  const newListing = new allListing(req.body);
  await newListing.save();
  res.redirect("/listings");
});


// Show a Particular Listing
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await allListing.findById(id);
  res.render("views/show", { listing });
});


// Edit Listing Form
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await allListing.findById(id);
  res.render("views/editListing", { listing });
});


// Update Listing
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await allListing.findByIdAndUpdate(id, req.body);
  res.redirect(`/listings/${id}`);
});


// Delete Listing
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await allListing.findByIdAndDelete(id);
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    res.send("Cannot delete the listing!");
  }
});

// -------------------- Server --------------------
app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
