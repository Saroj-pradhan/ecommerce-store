const dotenv = require("dotenv");
dotenv.config();
const User  = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtkey = process.env.JWT_SECRET;
const protect = async (req,res,next)=>{
try {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
   const token = req.headers.authorization.split(" ")[1]; 
   const decoded =  jwt.verify(token,jwtkey);
    req.user =await User.findById(decoded.user.id).select("-password");
   next();
    }else{
        throw new Error("Authentication failed, No Token Found");
    }
} catch (error) {
    console.log(error);
    res.send("Token Verification Failed",error);
}
}

module.exports = {protect};