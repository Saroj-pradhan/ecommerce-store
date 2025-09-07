const dotenv = require("dotenv");
dotenv.config();
const User  = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtkey = process.env.JWT_SECRET;

//Protect Route To verify jwt token 
const protect = async (req,res,next)=>{
    console.log(req.headers.authorization,"auth")
try {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
   const token = req.headers.authorization.split(" ")[1]; 
  console.log(token,"tok");
   const decoded =  jwt.verify(token,jwtkey);
   
    req.user =await User.findById(decoded.user.id).select("-password");
   if (!req.user) {
  return res.status(401).json({ error: "No Such User Exists" });
}
   next();
    }else{
        throw new Error("Authentication failed, No Token Found");
    }
} catch (error) {
    console.log("Error at Protect",error);
    res.status(401).send("Token Verification Failed",error);
}
}

// a route to check user is admin or customer.
const isAdmin = (req,res,next)=>{
try {
    const {role } = req.user.role;
    if(req.user && req.user.role.toLowerCase() == "admin"){
       return  next();
    }
    return res.status(403).json({
        message:"Not Authorized As Admin"
    });
} catch (error) {
   
   return res.status(500).json({
        message:error.message || "Only Admin Have Acess"
    })
}
}
module.exports = {protect , isAdmin};