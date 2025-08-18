const {data}=require("../Datas/data");
const mongoose=require("mongoose");
const allListing=require("../Models/allListing");


async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderstay");
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
