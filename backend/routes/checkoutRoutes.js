const express = require("express");
const router = express.Router();
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const {protect} = require("../middleware/authMiddleware");
const crypto =  require("crypto");
const Razaropay = require("razorpay");

const razorpay = new Razaropay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET
})
router.post("/",protect,async (req,res)=>{
const {checkoutItems,shippingAddress,paymentMethod,totalPrice} = req.body;
if(!checkoutItems || checkoutItems.length === 0) return res.status(404).send('no Items in checkOut');
console.log(totalPrice,"kkk"); 
const options = {
    amount: Math.round(Number(totalPrice) * 100), // Amount in paise (e.g., 500 INR = 50000 paise)
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };
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
    const createorderRazorpay = await razorpay.orders.create(options);
    res.status(201).json({createorderRazorpay,checkoutId:newCheckout._id});
} catch (error) {
      console.error("Checkout creation failed:", error);
    res.status(500).send("Server Error");
}

})

// checkout 
router.post("/:id/pay",async (req,res)=>{
    try {
        const {paymentDetails,verifyDetails} = req.body;
        const checkout = await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({message:"Checkout not found"});
        }
       const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = verifyDetails;
         const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
         checkout.isPaid = true;
            checkout.paymentStatus="paid";
            checkout.paymentDetails = {...paymentDetails,...verifyDetails};
            checkout.paidAt = Date.now();
            await checkout.save();
        res.json({ success: true, message: "Payment verified successfully",checkout });
    } else {
        res.json({ success: false, message: "Payment verification failed"});
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
          res.status(404).json({message:"order is already already Created"});
        }else{
            res.status(400).json({message:"Orderpayment  is not paid"});
        }
    } catch (error) {
         console.log(error);
          res.status(500).send("Server Error",error);
    }
})
module.exports = router;