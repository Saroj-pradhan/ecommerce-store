const mongoose = require("mongoose")
const Product = require("./Product")
const User = require("./User")
const CartItemSchema =new mongoose.Schema({
productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Product,
    required:true
},
name:String,
image:String,
price:Number,
size:String,
color:{type:String},
quantity:{type:Number , default:1}
},
{_id:false}
)
// cart 
const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
    },
    guestId:String,
    products:[CartItemSchema],//embedded the cartitemschema
   totalPrice:{type:Number ,required:true,default:0}
}
,{
    timestamps:true
})
const Cart = mongoose.model("Cart",CartSchema);
module.exports = Cart;