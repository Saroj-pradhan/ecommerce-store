const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");
const Cart = require("./models/Cart")
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
    await Cart.deleteMany();
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
