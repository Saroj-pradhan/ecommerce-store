const express = require("express");
const router = express.Router();
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const {protect} = require("../middleware/authMiddleware");

router.post("/",protect,async (req,res)=>{
const {checkoutItems,shippingAddress,paymentMethod,totalPrice} = req.body;
if(!checkoutItems || checkoutItems.length === 0) return res.status(404).send('no Items in checkOut');
try {
    const newCheckout = await Checkout.create({
        user:req.user._id,
        checkoutItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        paymentStatus:"Pending",
        isPaid:false
    })
    console.log("checkout created for user",req.user);
    res.status(201).json(newCheckout);
} catch (error) {
      console.error("Checkout creation failed:", error.message);
    res.status(500).send("Server Error");
}

})

// checkout 
router.post("/:id/pay",async (req,res)=>{
    try {
        const {paymentDetails,paymentStatus} = req.body;
        const checkout = await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({message:"Checkout not found"});
        }
        if(paymentStatus === "paid"){
            checkout.isPaid = true;
            checkout.paymentStatus=paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();
            res.status(200).json(checkout);
        }else{
          res.status(404).json({message:"Invalid Payment Status"});
        }
    } catch (error) {
        console.error("Checkout creation failed:", error.message);
          res.status(500).send("Server Error");
    }
})

// payment cobfirmation/ finalize
router.post("/:id/finalize",async (req,res)=>{
    try {
        const checkout = await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({message:"Checkout not found"});
        }
        if(checkout.isPaid && !checkout.isFinalized){
          const finalorder = await Order.create({
             user: checkout.user,
             orderItems:checkout.checkoutItems,
             shippingAddress:checkout.shippingAddress,
             paymentMethod:checkout.paymentMethod,
             totalPrice:checkout.totalPrice,
             isPaid:true,
             paidAt:checkout.paidAt,
             isdelivered:false,
             paymentStatus:"paid",
             paymentDetails:checkout.paymentDetails
          });
          checkout.isFinalized =true;
          checkout.finalizedAt =Date.now();

            await checkout.save();
            await Cart.findOneAndDelete({user:checkout.user})
            res.status(200).json(finalorder);
        }else if (checkout.isFinalized){
          res.status(404).json({message:"checkout already finalized"});
        }else{
            res.status(400).json({message:"Checkout is not paid"});
        }
    } catch (error) {
          res.status(500).send("Server Error");
    }
})
module.exports = router;