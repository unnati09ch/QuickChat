const express = require('express');
const router = express.Router();
const { sendMesssage, getMessage }=require("../controllers/messagecontrollers");
const protect = require('../middlewares/authmiddleware');


router.post("/",protect,sendMesssage);
router.get("/:chatId",protect,getMessage);



module.exports=router;