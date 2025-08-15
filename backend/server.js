const connectDB = require("./config/db")
const express = require("express");
const cors = require("cors");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("safff  kkkk")
})
const port = process.env.PORT || 5000;
connectDB();
app.listen(port,()=>{
    console.log("server started at 3000")
});