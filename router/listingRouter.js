const express=require("express");
const listingRouter=express.Router();
const allListing = require("../Models/allListing");
const Review = require("../Models/Review");
const {validateListing}=require("../validatation");

const ExpressError = require("../utils/expressError");
const wrapAsync=require("../utils/wrapAsync");




// Listing Validation Middleware
const validateListingMiddleware = (req, res, next) => {
  let { error } = validateListing.validate(req.body);
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
listingRouter.get("/new", (req, res) => {
  res.render("views/newListing");
});

// Save New Listing
listingRouter.post(
  "/new",
  validateListingMiddleware,
  wrapAsync(async (req, res) => {
    const newListing = new allListing(req.body);
    await newListing.save();
    res.redirect("/");
  })
);



// Show a Particular Listing
listingRouter.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await allListing.findById(id).populate("reviews");
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("views/show", { listing });
  })
);

// Edit Listing Form
listingRouter.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await allListing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("views/editListing", { listing });
  })
);

// Update Listing
listingRouter.put(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await allListing.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!updatedListing) throw new ExpressError(404, "Listing not found");
    res.redirect(`/${id}`);
  })
);

// Delete Listing
listingRouter.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deleted = await allListing.findByIdAndDelete(id);
    if (!deleted) throw new ExpressError(404, "Listing not found");
    res.redirect("/");
  })
);




module.exports=listingRouter;

