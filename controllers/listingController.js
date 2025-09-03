const allListing=require("../Models/allListing")
const {ExpressError}=require("../utils/expressError")
const cloudinary = require("cloudinary").v2;

module.exports.index=async (req, res) => {
    const listings = await allListing.find({});
    res.render("views/index", { listings });
  }

module.exports.showNewListing= async (req, res) => {
  res.render("views/newListing");
}

module.exports.searchListing=async (req, res) => {
  const { query } = req.query;
  // console.log(query);
  if (!query) {
    return res.redirect("/listings");
  }

  const listing = await allListing.findOne({ title: query });

  // Render results page
  res.render("views/show.ejs", { listing,user:req.user});
}

module.exports.saveNewListing = async (req, res) => {
  try {
    // Create a new listing with form data
    const newListing = new allListing(req.body);

    //console.log("Current User:", req.user);

    // Assign current user as owner
    newListing.owner = req.user._id;

    // If file was uploaded, save its path in the DB
    if (req.file) {
      // If using local storage:
      const url=req.file.path;
      const filename=req.file.filename;
      newListing.url = {url,filename};
     
    }

    // Save the listing in DB
    await newListing.save();

    req.flash("success", "Congratulations! We listed your home!");
    res.redirect("/listings");
  } catch (err) {
    console.error("Error saving listing:", err);
    req.flash("error", "Something went wrong while saving your listing.");
    res.redirect("/listings/new");
  }
};

module.exports.showListing=async (req, res) => {
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
  }

module.exports.editListing=async (req, res) => {
    const { id } = req.params;
    const listing = await allListing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("views/editListing", { listing ,user:req.user});
  }

module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the listing
    const listing = await allListing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Update normal fields
    listing.title = req.body.title;
    listing.location = req.body.location;
    listing.country = req.body.country;
    listing.price = req.body.price;
    listing.description = req.body.description;

   
   if (req.file) {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "wanderstay_listings",
  });

  // Save properly into the url object
  listing.url = {
    url: result.secure_url,
    filename: result.public_id
  };
}

    await listing.save();

    req.flash("success", "Listing updated successfully ");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while updating!");
    res.redirect("/listings");
  }
};

module.exports.deleteListing=async (req, res) => {
    const { id } = req.params;
    const deleted = await allListing.findByIdAndDelete(id);
    if (!deleted) throw new ExpressError(404, "Listing not found");
    req.flash("error", "Listing Delete successfully !");
    res.redirect("/listings");
  }