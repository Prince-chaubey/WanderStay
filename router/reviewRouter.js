const express = require("express");
const reviewRouter = express.Router({ mergeParams: true });
const allListing = require("../Models/allListing");
const Review = require("../Models/Review");
const { validateReview } = require("../validatation");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const { authenticateJWT, authorizeUser } = require("../middleware/authMiddleware");
const { createReview, deleteReview } = require("../controllers/reviewController");


// Middleware to validate review
const validateReviewMiddleware = (req, res, next) => {
  const { rating, comment } = req.body;
  let { error } = validateReview.validate({ rating, comment });
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

// Create Review
reviewRouter.post(
  "/",
  validateReviewMiddleware,
  authenticateJWT,
  wrapAsync(
    createReview
  )
);

// Delete Review
reviewRouter.delete(
  "/:reviewId",
  authenticateJWT,
  authorizeUser,
  wrapAsync(
    deleteReview
  )
);

module.exports = reviewRouter;
