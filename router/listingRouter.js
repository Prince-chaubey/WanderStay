const express = require("express");
const listingRouter = express.Router();
const allListing = require("../Models/allListing");
const Review = require("../Models/Review");
const { validateListing } = require("../validatation");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const { authenticateJWT, authorizeUser } = require("../middleware/authMiddleware");





// Listing Validation Middleware
const validateListingMiddleware = (req, res, next) => {
  console.log(req.body.listing);
  let { error } = validateListing.validate(req.body.listing);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  }
  else {
    next();
  }
};




//Home Route

listingRouter.get(
  "/",
  wrapAsync(async (req, res) => {
    const listings = await allListing.find({});
    res.render("views/index", { listings });
  })
);

// New Listing Form
listingRouter.get("/new", async (req, res) => {
  res.render("views/newListing");
});

//To search new listing
listingRouter.get("/search", wrapAsync(async (req, res) => {
  const { query } = req.query;
  // console.log(query);
  if (!query) {
    return res.redirect("/listings");
  }

  const listing = await allListing.findOne({ title: query });

  // Render results page
  res.render("views/show.ejs", { listing });
}));


// Save New Listing
listingRouter.post(
  "/new",
  validateListingMiddleware,
  authenticateJWT,
  wrapAsync(async (req, res) => {
    //console.log(req.body);
    const newListing = new allListing(req.body);

    console.log("Current User",req.user);

    newListing.owner = req.user._id;
    //accessing the current user
    
    
    await newListing.save();

    // console.log("Owner :",newListing.owner);
    //console.log("Listing:",newListing);
    req.flash("success", "Congratulations we listed your home!");
    res.redirect("/listings");
  })
);

// Show a Particular Listing
listingRouter.get(
  "/:id",
  authenticateJWT,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await allListing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" }   
      })
      .populate("owner"); 
    
    if (!listing) throw new ExpressError(404, "Listing not found");

    //console.log(req.user);
    
    res.render("views/show", { listing,user:req.user});
  })
);


// Edit Listing Form
listingRouter.get(
  "/:id/edit",
  authenticateJWT,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await allListing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("views/editListing", { listing ,user:req.user});
  })
);

// Update Listing
listingRouter.put(
  "/:id",
  authenticateJWT,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await allListing.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!updatedListing) throw new ExpressError(404, "Listing not found");
    else req.flash("success", "Listing edited successfully!");

    res.redirect(`/listings/${id}`);
  })
);

// Delete Listing
listingRouter.delete(
  "/:id",
  authenticateJWT,
  authorizeUser,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deleted = await allListing.findByIdAndDelete(id);
    if (!deleted) throw new ExpressError(404, "Listing not found");
    req.flash("error", "Listing Delete successfully !");
    res.redirect("/listings");
  })
);




module.exports = listingRouter;

