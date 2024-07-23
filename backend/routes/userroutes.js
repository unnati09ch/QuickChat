const express = require('express');
const router = express.Router();
const UserControllers=require("../controllers/usercontrollers");
const bcrypt=require("bcrypt");
const protect=require("../middlewares/authmiddleware");


router.post("/login",UserControllers.login);

router.post("/signup",UserControllers.signup);
router.get("/getusers",protect,UserControllers.Allusers);

module.exports=router;
