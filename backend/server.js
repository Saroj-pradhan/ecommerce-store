const connectDB = require("./config/db")
const express = require("express");
const app = express();

const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const Productroutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes")
// .env varibale load into process.env
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Server is working")
})
//All api endpoint related to /user
app.use("/user",userRoutes);
app.use("/products",Productroutes);
app.use("/cart",cartRoutes);
app.use("/checkout",checkoutRoutes);
app.use("/orders",orderRoutes);
app.use("/upload",uploadRoutes);
app.use("/admin",adminRoutes);
app.use("/admin/products",productAdminRoutes);
app.use('/admin/orders',adminOrderRoutes)
//defining port no
const port = process.env.PORT || 5000;

// Connecting to mongo database
connectDB();
// listening to server at port 
app.listen(port,()=>{
    console.log("server started at ",port);
});