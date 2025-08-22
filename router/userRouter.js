const express=require("express");
const wrapAsync = require("../utils/wrapAsync");


const userRouter=express.Router();

userRouter.get("/signup",(req,res)=>{
    res.render("views/signUp");
})
userRouter.get("/login",(req,res)=>{
    res.render("views/login");
})



module.exports=userRouter;