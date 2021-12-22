const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function(req,res,next){
    //GET the Token
    const token = req.header('x-auth-token');
    //Check if not token
    if(!token){
        return res.status(401).json({
            msg:'No token, authorization denied'
        });
    }
    //Verify Token
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        //Save that user in the request to access it in other request
        req.user = decoded.user;
        next();
    }
    catch(err){
        res.status(401).json({msg:'Token is not valid'});
    }
}