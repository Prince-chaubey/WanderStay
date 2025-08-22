const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const userSchema=new Schema({
     username:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     }
})


const user=new mongoose.model("User",userSchema);

module.exports =user;
