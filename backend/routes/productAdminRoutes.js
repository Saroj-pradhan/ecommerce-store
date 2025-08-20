const express = require("express");
const router = express.Router();
const {protect,isAdmin} = require("../middleware/authMiddleware");
const Product = require("../models/Product");

router.get("/",protect,isAdmin,async (req,res)=>{
    try {
        
        const usersProduct = await Product.find({});          
            res.status(200).json({message:"Product found Successfully",usersProduct})  
     
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})

module.exports = router;