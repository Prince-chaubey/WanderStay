const express = require("express");
const listingRouter = express.Router();
const allListing = require("../Models/allListing");
const Review = require("../Models/Review");
const { validateListing } = require("../validatation");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const { authenticateJWT, authorizeUser } = require("../middleware/authMiddleware");
const { index, showNewListing, searchListing, saveNewListing, editListing, updateListing, deleteListing } = require("../controllers/listingController");





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
  wrapAsync(index)
);

// New Listing Form
listingRouter.get("/new",
  showNewListing
);

//To search new listing
listingRouter.get("/search", wrapAsync(
  searchListing
));


// Save New Listing
listingRouter.post(
  "/new",
  validateListingMiddleware,
  authenticateJWT,
  wrapAsync(
    saveNewListing
  )
);

// Show a Particular Listing
listingRouter.get(
  "/:id",
  authenticateJWT,
  wrapAsync(
    showNewListing
  )
);


// Edit Listing Form
listingRouter.get(
  "/:id/edit",
  authenticateJWT,
  wrapAsync(
    editListing
  )
);

// Update Listing
listingRouter.put(
  "/:id",
  authenticateJWT,
  wrapAsync(
    updateListing
  )
);

// Delete Listing
listingRouter.delete(
  "/:id",
  authenticateJWT,
  authorizeUser,
  wrapAsync(deleteListing)
);




module.exports = listingRouter;

