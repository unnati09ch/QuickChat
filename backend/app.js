
const express=require("express");
const chats=require("./data/data");
//const bodyParser = require("body-parser");
const cors=require("cors");
 const connectDb=require("./config/db");
 connectDb();
const Routes=require("./routes/userroutes");
const chatRoutes=require("./routes/chatroutes");
const messageRoutes=require("./routes/messageroutes");
const bcrypt=require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const Message = require("./models/messagemodel");
const app=express();
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors());

const PORT=process.env.PORT||5000
app.use("/api/user",Routes);
app.use("/api/chats",chatRoutes);
app.use("/api/message",messageRoutes);

const server=app.listen(PORT,function(){
  console.log("server started");

});
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "https://chat-mingle-frontend.onrender.com",
      // credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup",(userData)=>{
      socket.join(userData._id);
      //  console.log(userData);
  
      socket.emit("connected");
    });
    socket.on("joinchat",(roomId)=>{
      socket.join(roomId);
      //console.log(roomId);
  
    })
    socket.on("new message",(newMessageRecieved)=>{
      var Users=newMessageRecieved.chat.users;
      Users.forEach(user => {
        console.log(user._id);
        if(user._id==newMessageRecieved.sender._id)return;
        socket.in(user._id).emit("message recieved",newMessageRecieved);
        
      });
    });
     
      
    socket.on("typing", (room) => {

      socket.in(room).emit("typing")
    });
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });




  });



