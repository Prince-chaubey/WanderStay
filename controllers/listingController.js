const allListing=require("../Models/allListing")

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
  res.render("views/show.ejs", { listing });
}

module.exports.saveNewListing=async (req, res) => {
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
  }

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

module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    const updatedListing = await allListing.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!updatedListing) throw new ExpressError(404, "Listing not found");
    else req.flash("success", "Listing edited successfully!");

    res.redirect(`/listings/${id}`);
  }

module.exports.deleteListing=async (req, res) => {
    const { id } = req.params;
    const deleted = await allListing.findByIdAndDelete(id);
    if (!deleted) throw new ExpressError(404, "Listing not found");
    req.flash("error", "Listing Delete successfully !");
    res.redirect("/listings");
  }