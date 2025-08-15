const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
 const {protect} = require("../middleware/authMiddleware");
const router = express.Router();
//Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let isExitingUser = await User.findOne({ email });
    if (isExitingUser)
      return res.status(400).json({ message: "User Already Exists" });
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    //jwt payload
    const payload = { user: { id: user._id, role: user.role } };
    //jwt signature
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "48h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("Error in registration ", error);
    res.status(500).send("Error in registration ", error);
  }
});


// Login route for user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "No user Found , Please Register" });
    //  Password verificaion/matching
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const payload = { user: { id: user._id, role: user.role } };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "48h",
    });
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Login Succesfully",
      token,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(505).send("Error in Login , Server Error", error);
  }
});


// user profilr route 
router.get("/profile",protect ,async (req,res)=>{
try{
   console.log(req);
 const { user } = req;
 res.send(user);
}catch(error){
   console.error("error",error);
   res.send("Server error");
}
})


module.exports = router;
