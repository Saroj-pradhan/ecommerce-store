// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
// const connectDB = require("./config/db")
// // const express = require("express");
// // const app = express();
// const Product = require("./models/Product")
// const User  = require("../models/User");
// const products = require("./data/products");
// // const { deleteMany } = require("./models/User");
//   await mongoose.connect(process.env.MONGO_URI);
//   const seedData = async ()=>{
//     try {
//         await Product.deleteMany();
//         await User.deleteMany();
//         const admin = await User.create({
//             name:"Admin",
//             email:"admin@123",
//             password:"admin123",
//             role:"admin"
//         })
//         const userid = admin._id;
//         const sampleProduct = products.map((p)=>(
//             {...p,user:userid}
//         ))
//         const results = await Product.insertMany(sampleProduct) ;
//         console.log(results);
//         console.log("succesfull");
//         process.exit();
//     } catch (error) {
//         console.log(error,"error");
//          process.exit(1);
//     }
//   }

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting MongoDB:", error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    });

    const userid = admin._id;

    const sampleProducts = products.map((p) => ({
      ...p,
      user: userid,
    }));

    const results = await Product.insertMany(sampleProducts);

    console.log("Inserted products:", results.length);
    console.log("Seeding successful!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

// Run
(async () => {
  await connectDB();
  await seedData();
})();
