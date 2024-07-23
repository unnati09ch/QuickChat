const express = require('express');
const router = express.Router();
const {accessChats, fetchChats, createGroupChat, renameGroup, removeUser,addUser}=require("../controllers/chatcontrollers");
const protect = require('../middlewares/authmiddleware');


router.post("/",protect,accessChats);
router.get("/",protect,fetchChats);
router.post("/group",protect,createGroupChat);
router.put("/rename",protect,renameGroup);
router.put("/add",protect,addUser);
router.put("/remove",protect,removeUser);


module.exports=router;
