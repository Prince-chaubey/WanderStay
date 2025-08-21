const express = require("express");
const reviewRouter = express.Router({ mergeParams: true }); // mergeParams to access :id from parent route
const allListing = require("../Models/allListing");
const Review = require("../Models/Review");
const { validateReview } = require("../validatation");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");

// ========================= Middlewares to validates Review schema ====================================
//
const validateReviewMiddleware=(req,res,next)=>{
  const {rating,comment}=req.body;
  let {error}=validateReview.validate({rating,comment});
  //console.log(error.details);
 if (error) {
  const msg = error.details.map(el => el.message).join(", ");
  throw new ExpressError(400, msg);
} else {
  next();
}
}

// Create Review
reviewRouter.post(
  "/",
  validateReviewMiddleware,
  wrapAsync(async (req, res) => {
    const { id } = req.params; // comes from parent route (/listings/:id/reviews)
    const listing = await allListing.findById(id);

    const { rating, comment } = req.body;
    const newReview = new Review({ rating, comment });
    await newReview.save();

    listing.reviews.push(newReview);
    await listing.save();

    res.redirect(`/listings/${id}`);
  })
);

//Delete Review
reviewRouter.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    await Review.findByIdAndDelete(reviewId);
    await allListing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    res.redirect(`/listings/${id}`);
  })
);

module.exports = reviewRouter;
