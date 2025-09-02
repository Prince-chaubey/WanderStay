const {data}=require("../Datas/data");
const mongoose=require("mongoose");
const allListing=require("../Models/allListing");

require("dotenv").config();

async function main() {
  try {
    const URL=process.env.DB_URL;
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  }
}

main();


//Pushing the fresh data....

const insertData=async()=>{
    await allListing.deleteMany({});    
    await allListing.insertMany(data);
    console.log("Database Intitalised!");
}


insertData();
