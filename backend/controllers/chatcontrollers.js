const express = require('express');
const Chat=require("../models/chatmodel");
const User=require("../models/usermodel");
const Message=require("../models/messagemodel");

const accessChats=async (req,res)=>{
  console.log("gotdata");
    const {userId}=req.body;
    if(!userId){
       res.send("user id not send");
    }
    else{
        isChat= await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
    })
       .populate("users", "-password")
      
     .populate("latestMessage")
    .populate('latestMessage.sender', 'name email');
      
    if (isChat.length > 0) {
        res.send(isChat[0]);
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
              "users",
              "-password"
            );
            res.status(200).json(FullChat);
          } catch (error) {
            res.status(400);
           res.send(error.message);
          }
        }

    }



}
const fetchChats=async(req,res)=>{
  try{
  const chat=await Chat.find( { users: { $elemMatch: { $eq: req.user._id } } })
  .populate("users","-password")
  .populate("latestMessage")
  .populate('latestMessage.sender', 'name email')
  .populate("groupAdmin","-password")
  .sort({updatedAt:-1});


  res.send(chat);
  }
  catch(error){
    res.send("error");
  }

}
const createGroupChat=async(req,res)=>{
  const{name,users}=req.body;
  
      if(users.length<2)res.status(400).send("atleast 2 users needed");
      else{
        users.push(req.user);
        try{
   const groupchat= await Chat.create({
      chatName:name,
      isGroupChat:true,
      users:users,
      groupAdmin:req.user


      })
    
    const fullChat=await Chat.findOne({_id:groupchat._id})
    .populate("users","-password")
  .populate("groupAdmin","-password");
  res.send(fullChat);
      }
      catch(error)
      {
        console.log("error");

      }


    }
  
}
const renameGroup=async(req,res)=>{
  const {Id,name}=req.body;
  
 const chat=await Chat.findByIdAndUpdate(Id,{chatName:name},{new:true})
 .populate("users","-password")
 .populate("groupAdmin","-password");
 if(!chat)
 {
  res.send("chat not found");
 }
 else{
  res.send(chat);
 }
 
 

}
const addUser=async(req,res)=>{
  
  const{chatId,userId}=req.body;
  const chat=await Chat.findByIdAndUpdate(chatId,
    {
      $push:{users:userId}

  },
  {new:true})
 .populate("users","-password")
 .populate("groupAdmin","-password");
 if(!chat)
 {
  
  res.send("chat not found");
 }
 else{
  console.log("added")
  res.send(chat);
 }

}
const removeUser=async(req,res)=>{
  const{chatId,userId}=req.body;
  const chat=await Chat.findByIdAndUpdate(chatId,
    {
      $pull:{users:userId}

  },
  {new:true})
 .populate("users","-password")
 .populate("groupAdmin","-password");
 if(!chat)
 {
  res.send("chat not found");
 }
 else{
  res.send(chat);
 }

}




module.exports={accessChats,fetchChats,createGroupChat,renameGroup,addUser,removeUser};
