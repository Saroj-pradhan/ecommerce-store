const express = require("express");
const router  = express.Router();
const Order = require("../models/Order");
const {protect,isAdmin} = require("../middleware/authMiddleware");
// update order status
router.get("/",protect,isAdmin,async (req,res)=>{
    try {
       const orders = await Order.find({}).populate("user","name email");
      if(!orders) return res.status(404).send("orders not Found");
      res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(505).send("Server Error");
    }
})
router.put("/:id",protect,isAdmin,async (req,res)=>{
    try {
        const id = req.params.id;
      const{status} = req.body;
      const orders = await Order.findById(id);
      
       
      if(!orders) return res.status(404).send("orders not Found");
      orders.status=status;
      orders.isDelivered = status === "Delivered";
      orders.deliveredAt = status === "Delivered"?Date.now():orders.deliveredAt;
      const updatedOrder =await orders.save();
      res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(505).send("Server Error");
    }
})
// delete order by admin 
router.delete("/:id",protect,isAdmin,async (req,res)=>{
    try {
      const id = req.params.id;
      const orders = await Order.findOneAndDelete(id);

      if(!orders) return res.status(404).send("orders not Found");
     
      res.status(200).json({message:"Order Removed Successfully",orders});
    } catch (error) {
        console.log(error);
        res.status(505).send("Server Error");
    }
})
module.exports = router;
