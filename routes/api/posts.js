const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
//Require the user model
const user = require('../../models/User');
//@route GET /api/posts
//@desc Test route
//@access Private
router.get("/",auth,async (req,res)=>{
    res.json("This is the post route!")
});
module.exports=router;