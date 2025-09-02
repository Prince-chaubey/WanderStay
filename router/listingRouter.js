const express = require("express");
const listingRouter = express.Router();

// Models
const allListing = require("../Models/allListing");
const Review = require("../Models/Review");

// Utils & Middlewares
const { validateListing } = require("../validatation");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const { authenticateJWT, authorizeUser } = require("../middleware/authMiddleware");

// Controllers
const {
  index,
  showNewListing,
  searchListing,
  saveNewListing,
  editListing,
  updateListing,
  deleteListing,
  showListing
} = require("../controllers/listingController");

// Multer (for image uploads)
const multer = require("multer");
const { storage } = require("../utils/cloud_config");
const upload = multer({ storage });

/* ----------------------
   VALIDATION MIDDLEWARE
------------------------- */
function validateListingMiddleware(req, res, next) {
  const { error } = validateListing.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
}

/* ----------------------
          ROUTES
------------------------- */

// Home / Index (All Listings)
listingRouter.get("/", wrapAsync(index));

// Search Listings
listingRouter.get("/search", wrapAsync(searchListing));

// New Listing Form
listingRouter.get("/new", authenticateJWT, showNewListing);

// Save New Listing
listingRouter.post(
  "/new",
  authenticateJWT,
  upload.single("image"),
  validateListingMiddleware,
  wrapAsync(saveNewListing)
);

// Show Single Listing
listingRouter.get("/:id", authenticateJWT, wrapAsync(showListing));

// Edit Listing Form
listingRouter.get("/:id/edit", authenticateJWT, wrapAsync(editListing));

// Update Listing
listingRouter.put("/:id", authenticateJWT, upload.single("image"), wrapAsync(updateListing));

// Delete Listing
listingRouter.delete("/:id", authenticateJWT, authorizeUser, wrapAsync(deleteListing));

/* ----------------------
       EXPORT ROUTER
------------------------- */
module.exports = listingRouter;
