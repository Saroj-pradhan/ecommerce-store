const express = require("express");
const router  = express.Router();
const Order = require("../models/Order");
const {protect} = require("../middleware/authMiddleware");
// get orders
router.get("/my-order",protect , async (req,res)=>{
    console.log("22222");
try {
    const userId = req.user._id;
    let orderInfo = await Order.find({user:userId}).sort({createdAt:-1});
     console.log("3333")
   res.send(orderInfo);
} catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
}
})
//get order by order Id
router.get("/:id",protect,async (req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate("user" ,"email name");
          if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        console.log(order,"order")
        res.json(order);
    } catch (error) {
         console.log(error.message);
    res.status(500).send("Server Error");
    }
})
module.exports = router;