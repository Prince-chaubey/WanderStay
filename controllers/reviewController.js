const allListing=require("../Models/allListing");
const Review=require("../Models/Review");

module.exports.createReview=async (req, res) => {
    const { id } = req.params; // parent route (/listings/:id/reviews)
    const listing = await allListing.findById(id);

    //console.log("Review Listing",listing);
    
    //console.log("Current User for review:",req.user);

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    const { rating, comment } = req.body;
    const newReview = new Review({
      rating,
      comment,
      author: req.user._id   
    });

    await newReview.save();
    listing.reviews.push(newReview);

   // console.log("Review edited listing:",listing);
    await listing.save();

    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${id}`);
  }


module.exports.deleteReview=async (req, res) => {
    const { id, reviewId } = req.params;

    const listing = await allListing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    await Review.findByIdAndDelete(reviewId);
    await allListing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
  }

