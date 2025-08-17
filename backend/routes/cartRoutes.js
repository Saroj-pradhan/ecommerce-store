const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

async function getCart(userId,guestId){
if(userId){
    return await Cart.findOne({user:userId});
}else if(guestId){
   return await Cart.findOne({guestId});
}else{
    return null;
}
}
// add product to cart 
router.post("/",async (req,res)=>{
try {
    console.log("inside");
    const {productId,quantity,size,color,guestId,userId} = req.body;
    const product = await Product.findById(productId);
    if(!product) return res.send("product not found");
    const carts = await getCart(userId,guestId);
    //if card exits , update it
    if(carts){
       
        const productIndex = carts.products.findIndex(
        (p)=>p.productId.toString() === productId && (color ? p.color === color : true) &&  (size ? p.size === size : true) 
        )

        if(productIndex > -1){
            carts.products[productIndex].quantity+=quantity;
        }else{
            carts.products.push({
                productId,
                name:product.name,
                image:product.image[0].url,
                price:product.price,
                size:size,
                color:color,
                quantity:quantity
            })
        }
        carts.totalPrice = carts.products.reduce((acc,item)=>(
           acc+(item.price *  item.quantity)
        ),0);
        await carts.save();
         res.status(200).json(carts);
    }else{

        const newCart =await  Cart.create({
            user:userId?userId:undefined,
            guestId:guestId?guestId:"guest_"+new Date().getTime(),
           products:[
            {
                productId,
                name:product.name,
                image:product.images[0].url,
                price:product.price,
                size:size,
                color:color,
                quantity:quantity
           }
           ],
           totalPrice: Number(quantity)*product.price
        })
        res.status(200).json(newCart)
    }
    
  
} catch (error) {
    console.log("Error",error);
    res.status(505).send("Server Error")
}
})


//update quantity of product 
router.put("/",async (req,res)=>{
    try {
        const {productId,quantity,guestId,userId,size,color} = req.body;
        const carts = await getCart(userId,guestId);
        if(!carts) return res.send("cart not found");
        const product   = await Product.findById(productId);
        if(!product) return res.send("product not found");

         const productIndex = carts.products.findIndex(
        (p)=>p.productId.toString() === productId && (color ? p.color === color : true) &&  (size ? p.size === size : true) 
        )

        if(productIndex > -1){
            if(quantity>0){
                carts.products[productIndex].quantity=quantity;
            }else{
             carts.products.splice(productIndex,1);//remove product
            }
              carts.totalPrice = carts.products.reduce((acc,item)=>(
           acc+(item.price *  item.quantity)
        ),0);
        }
        res.status(200).json(carts);
    } catch (error) {
          console.log("Error",error);
    res.status(505).send("Server Error")
    }
})

router.post("/merge",protect,async (req,res)=>{
    try {
        const {guestId} = req.body;
        const guestCart = await Cart.findOne({guestId});
        const userCart = await Cart.findOne({user:req.user._id});
      
        if(guestCart){
            if(guestCart.products.length === 0){
                return res.status(404).json({
                    message:"Guest cart is Empty"
                });
            }
            if(userCart){
                guestCart.products.forEach((guestItem)=>{
              const productIndex = usercart.products.findIndex(
        (p)=>p.productId.toString() === guestItem.productId.toString() && (guestItem.color ? p.color === guestItem.color : true) &&  (guestItem.size ? p.size === guestItem.size : true) 
        )
            if(productIndex > -1){
                userCart.products[productindex].auantity += guestItem.quantity;
            }else{
                userCart.products.push(guestItem)
            }
                });

                userCart.totalPrice = userCart.products.reduce((acc,item)=>(
           acc+(item.price *  item.quantity)
        ),0);
        await userCart.save();
                      
                    try {
                        await Cart.findOneAndDelete({guestId});
                    } catch (error) {
                        console.log("Error in deleting guestid",error);
 
                    }
                    res.status(200).json(userCart)
            }else{
                guestCart.user = req.user._id;
                 guestCart.guestId = undefined;
                 await guestCart.save();
                 res.status(200).json(guestCart);
            }
        }else{
            if(userCart){
                return res.status(200).json(userCart);
            }
            res.status(404).json({message:"Guest Cart Not found"})
        }
    

    } catch (error) {
        console.log("Error",error);
    res.status(505).send("Server Error");
    }
})



module.exports = router;