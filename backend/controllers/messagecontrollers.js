const express = require('express');
const Message=require("../models/messagemodel");
const Chat = require('../models/chatmodel');
const User=require("../models/usermodel");

const getMessage=async(req,res)=>{
    
    try{
    const messages=await Message.find({chat:req.params.chatId})
    .populate("sender","name email")
    .populate("chat");
    res.send(messages)
    }
    catch(error){
        console.log(error);

    }
    

    

}
const sendMesssage=async(req,res)=>{
    
    const{content,chatId}=req.body;
    if(!content||!chatId) {
        return res.status(400);
    }
     else{
    var newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId,
    };
    

    try{
        console.log("message got");
       
        var message = await Message.create(newMessage);
        message=await message.populate("sender","name");
         message=await message.populate("chat");
       message= await User.populate(message,{
            path:"chat.users",
            select:"name email",

        });
        await Chat.findByIdAndUpdate(chatId,{latestMessage:message});
    console.log("response sent");
        res.send(message);

    }
    catch(error){
        res.status(400);
        

    }
}

}
module.exports={sendMesssage,getMessage};