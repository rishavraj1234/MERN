const express = require("express");
const router = express.Router();
//@route GEt /api/auth
//@desc Test route
//@access Private
router.get("/",(req,res)=>{
    res.send("Auth route");
});
module.exports=router;