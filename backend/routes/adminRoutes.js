const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {protect,isAdmin} = require("../middleware/authMiddleware");
//get all users
router.get("/users",protect,isAdmin,async (req,res)=>{
    try {
      const users = await User.find();
      res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(505).send("Server Error");
    }
})
//add user by admin only
router.post("/create-users",protect,isAdmin,async (req,res)=>{
    try {
        const{name,email,password,role} = req.body;
        const users = await User.findOne({email});
        if(users) return res.status(400).json({message:"User Already Exist"})
       
            const newUser = await User.create({
                name,email,password,role
            })
            res.status(200).json({message:"User Created Successfully",newUser})
        
      
     
    } catch (error) {
        console.log(error);
        res.status(505).send("Server Error");
    }
})
//delete user by admin
router.delete("/delete/:id",protect,isAdmin,async (req,res)=>{
    try {
        const id  = req.params.id;
        const users = await User.findOneAndDelete({_id:id});
        if(!users) return res.status(400).json({message:"User does'not  Exist"})
       
            
            res.status(200).json({message:"User Deleted Successfully",users})
        
      
     
    } catch (error) {
        console.log(error);
        res.status(505).send("Server Error");
    }
})
module.exports = router;