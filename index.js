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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "./layouts/boilerplate");


//Route for the whole listings

app.get("/listings", async (req, res) => {
  const listings = await allListing.find({});
  res.render("views/index", { listings }); 
});

//Route for a particular listing
app.get("/listings/:id",async(req,res)=>{
    const id=req.params.id;
    const listing=await allListing.findById(id);
    res.render("views/show",{listing});
})


app.listen(8080, () => {
  console.log(`server running at the port 8080`);
});
