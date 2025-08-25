const express = require("express");
const router = express.Router();
const {protect,isAdmin} = require("../middleware/authMiddleware");
const Product = require("../models/Product");

router.post("/create",protect , isAdmin ,async (req,res)=>{
try{
    console.log("req",req.body);
const {name, description, price, discountPrice, countInStock, sku, category, brand, size, colors, collections, material, gender, images, isFeatured, isPublished, rating, numReviews, tags, user, metaTitles, metaDescription, metaKeyword, dimensions, weight} = req.body;
const products = new Product(
    {name, description, price, discountPrice, countInStock, sku, category, brand, size, colors, collections, material, gender, images, isFeatured, isPublished, rating, numReviews, tags, user:req.user._id, metaTitles, metaDescription, metaKeyword, dimensions, weight}
);
 const createdProduct = await products.save();
 res.status(201).json(createdProduct);
}catch(error){
  console.log(error);
  res.status(500).send("Server Error",error);
}

})
// update Product Route
router.put("/:id",protect,isAdmin,async (req,res)=>{
    try {
        const {id}  = req.params;
        const {name, description, price, discountPrice, countInStock, sku, category, brand, size, colors, collections, material, gender, images, isFeatured, isPublished, rating, numReviews, tags, user, metaTitles, metaDescription, metaKeyword, dimensions, weight} = req.body;
const product = await Product.findById(id);
 if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
       // Update datas (only if provided by admin)
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.countInStock = countInStock || product.countInStock;
    product.sku = sku || product.sku;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.size = size || product.size;
    product.colors = colors || product.colors;
    product.collections = collections || product.collections;
    product.material = material || product.material;
    product.gender = gender || product.gender;
    product.images = images || product.images;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.isPublished = isPublished ?? product.isPublished;
    product.rating = rating || product.rating;
    product.numReviews = numReviews || product.numReviews;
    product.tags = tags || product.tags;
    product.user = user || product.user;
    product.metaTitles = metaTitles || product.metaTitles;
    product.metaDescription = metaDescription || product.metaDescription;
    product.metaKeyword = metaKeyword || product.metaKeyword;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;

    const updatedProduct = await product.save();

    res.json({
      message: "Product updated successfully",
      product: updatedProduct
    });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
})

router.delete("/delete/:id",protect,isAdmin,async (req,res)=>{
try {
    const id = req.params.id;
    const deletedProduct = await Product.findById(id);
    if(!deletedProduct) return res.status(404).send("the Product Not Found");
    await deletedProduct.deleteOne();
    res.status(200).json({
        message:"Product Removed Succesfully",
    });
} catch (error) {
    console.log(error);
        res.status(500).send("Server Error");
}
})

router.get("/filter",async (req,res)=>{

try {
     const{sortby,collection,color ,category,gender,material,brand,size,minPrice,maxPrice,search , limit} = req.query;
      let filter = {};

    // Handle array type queries (comma-separated string → array)
   if (collection && collection.toLowerCase() !== "all") {
      filter.collection = collection; // single value
    }

    if (category && category.toLowerCase() !== "all") {
      filter.category =  category;
    }

    if (material) {
      filter.material = { $in: material.split(",") };
    }

    if (size) {
      filter.size = { $in: size.split(",") };
    }

    if (brand) {
      filter.brand = { $in: brand.split(",") };
    }

      if (color) {
      filter.color = { $in: color.split(",") };
    }

    if (gender) {
      filter.gender = gender; // single value
    }

    

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
   
     // Search by name or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    // Sorting
     let sortOption = {};
       if(sortby){
        switch(sortby){
            case "PriceAsc":
                sortOption.price = 1;
                break;
            case "PriceDes":
                sortOption.price = -1;
                break;
            case "Popularity":
                sortOption.price = -1;
                break;
                default:
        }
     }
    
   let FilteredProducts = await Product.find(filter).sort(sortOption).limit(limit || 0);
   res.status(200).json(FilteredProducts);
} catch (error) {
    console.log("Error",error);
    res.status(500).send("Server Error");
}

})


// get similar product by id 
router.get("/similar/:id",async (req,res)=>{
    try {
        const {id} = req.params;
      const product = await Product.findById(id);
          if(!product) return res.status(404).send("Product Not Found");
          const similar =await Product.find({
            _id:{$ne : id},
             category:product.category,
             gender:product.gender,
             
          })
          console.log(similar);
       res.status(200).json(similar);
    } catch (error) {
         console.log("Error",error);
    res.status(500).send("Server Error");
    }
})
// best seller
router.get("/best-seller",async (req,res)=>{
    try {
      const bestproduct = await Product.findOne().sort({rating:-1});
          if(!bestproduct) return res.status(404).send("No Best Seller  Found");
       res.status(200).json(bestproduct);
    } catch (error) {
         console.log("Error",error);
    res.status(500).send("Server Error");
    }
})

// New Arrival
router.get("/new-arrival",async (req,res)=>{
    try {
      
      const  NewArrival = await Product.find().sort({createdAt:-1}).limit(10);
      
          if(! NewArrival) return res.status(404).send("No Best Seller  Found");
       res.status(200).json( NewArrival);
    } catch (error) {
         console.log("Error",error);
    res.status(500).send("Server Error");
    }
})
//top-selling
// Top Selling (based on rating)
router.get("/top-selling", async (req, res) => {
  try {
    const topSelling = await Product.find()
      .sort({ rating: -1 }) // highest rating first
      .skip(1)
      .limit(10);

    if (!topSelling || topSelling.length === 0) {
      return res.status(404).send("No Top Selling Products Found");
    }

    res.status(200).json(topSelling);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Server Error");
  }
});


// get one single product by id 
router.get("/:id",async (req,res)=>{
    try {
        const {id} = req.params;
      const product = await Product.findById(id);
          if(!product) return res.status(404).send("Product Not Found");
       res.status(200).json(product);
    } catch (error) {
         console.log("Error",error);
    res.status(500).send("Server Error");
    }
})
module.exports =  router;