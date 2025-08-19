const express = require("express");
const app = express();
const mongoose = require("mongoose");
const allListing = require("./Models/allListing");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

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

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.set("layout", "./layouts/boilerplate");


//Route for the whole listings

app.get("/listings", async (req, res) => {
  const listings = await allListing.find({});
  res.render("views/index", { listings }); 
});

//Route to get redirect to a new listing create form
app.get("/listings/new",(req,res)=>{
  res.render("views/newListing");
})

//Route to save the new listing data in Database
app.post("/listings/new",async(req,res)=>{
  const newListing=new allListing(req.body);
  await newListing.save();
  res.redirect(`/listings`);
})

//Route for a particular listing
app.get("/listings/:id",async(req,res)=>{
    const id=req.params.id;
    const listing=await allListing.findById(id);
    res.render("views/show",{listing});
})

//Route to delete a particular listing
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await allListing.findByIdAndDelete(id);
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    res.send("Cannot find the listing!");
  }
});





app.listen(8080, () => {
  console.log(`server running at the port 8080`);
});
