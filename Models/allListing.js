const mongoose = require("mongoose");
const Review = require("./Review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String, 
        default: "https://via.placeholder.com/300"
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews:[
       {
         type:Schema.Types.ObjectId,
         ref:"Review"
       }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});



listingSchema.post("findOneAndDelete",async(listing)=>{
    await Review.deleteMany({_id:{$in:listing.reviews}});
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;



