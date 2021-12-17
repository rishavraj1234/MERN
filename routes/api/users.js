const express = require("express");
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
//Require gravatar
const gravatar = require("gravatar");
//Require Schema
const User =require('../../models/User.js');
//Require bycrypt
const bcrypt = require('bcryptjs');
//@route POST api/users
//@desc Test route
//@access Public
router.post("/",[
    check('name','Name is required').not().isEmpty(),
    check('email','Please enter a valid email').isEmail(),
    check('password',"Please enter a valid password with 6 or more characters").isLength({min:6})
],async (req,res)=>{
    const errors = validationResult(req);
    if(!(errors.isEmpty())){
        return res.status(400).json({errors:errors.array()});
    }
    //See if user exists
    const {name,email,password} = req.body;
    try{
        console.log("Try block executed inside the user js");
        let user = await User.findOne({email:email});
        if(user)
        {
            return res.status(400).json({erros:[
                {
                    msg:"User already exisits"
                }]
            });
        }
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        user = new User({
            name,
            email,
            avatar,
            password
        });
        const salt = await bcrypt.genSalt(10);
        //Hash the password and save the user
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        //JSONWEBTOKEN
        res.send("Users Routes");
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;