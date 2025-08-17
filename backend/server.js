const connectDB = require("./config/db")
const express = require("express");
const app = express();

const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const Productroutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes")
// .env varibale load into process.env
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("safff  kkkk")
})
//All api endpoint related to /user
app.use("/user",userRoutes);
app.use("/products",Productroutes);
app.use("/cart",cartRoutes);
//defining port no
const port = process.env.PORT || 5000;

// Connecting to mongo database
connectDB();
// listening to server at port 
app.listen(port,()=>{
    console.log("server started at 3000")
});