const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
name:{type:String , required:true},
description:{type:String , required:true},
price:{type:Number , required:true},
discountPrice:{type:Number},
countInStock:{type:Number , required:true ,default:0},
sku:{type:String , required:true , unique:true},
category:{type:String , required:true},
brand:{type:String },
size:{type:[String],required:true},
colors:{type:[String],required:true},
collections:{type:String , required:true},
material:{type:String },
gender:{type:String , enum:["Men","Women","kids"]},
images:[{
    url:{type:String,required:true},
    altText:{type:String ,default:"Product image"}
}],
isFeatured:{type:Boolean,default:false},
isPublished:{type:Boolean,default:false},
rating:{type:Number , required:true ,default:0},
numReviews:{type:Number , required:true ,default:0},
tags:{type:String},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
metaTitles:{type:String},
metaDescription:{type:String},
metaKeyword:{type:String},
dimensions:{
    length:Number,
    width:Number,
    height:Number,
},
weight:{type:Number}
},
{timestamps:true}
)

const Product = mongoose.model("Product",productSchema);
module.exports = Product;