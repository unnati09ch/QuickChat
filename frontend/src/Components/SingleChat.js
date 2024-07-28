import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/Chatprovider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast,  } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/Chatlogic';
import Profilemodal from './Profilemodal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import "../styles.css";
import io from "socket.io-client";


import Lottie from "react-lottie";
import animationData from "../animations/typing.json";

var socket,selectedChatCompare;
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};



const SingleChat = ({fetchAgain,setFetchAgain}) => {
  const toast=useToast();
    const{selectedChat,setSelectedChat,user,notification,setNotification}=ChatState();
    const[loading,setLoading]=useState(false);
    const[messages,setMessages]=useState([]);
    const[newmessage,setnewMessage]=useState("");
    const[socketConnected,setSocketConnected]=useState(false);
    const[typing,setTyping]=useState(false);
    const[istyping,setIsTyping]=useState(false);

   
    
    //console.log(notification);
    const sendMessage=async(event)=>
    {
      
      if(event.key=="Enter" && newmessage)
      {
       socket.emit("stop typing",selectedChat._id);
        try{
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`,
  
        },
      };
      setnewMessage("");
        const {data}=await axios.post("https://chat-mingle-backend.onrender.com/api/message",{
          chatId:selectedChat._id,
          content:newmessage
        

        },config);
        console.log(data);
        socket.emit("new message",data);
        setMessages([...messages,data]);
       
              
      }
      catch(error){
        console.log("error")
        toast({
          title: "failed to send message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

      }
      
    }
  };
  const fetchMessages=async()=>{
    if(!selectedChat)return;
    try{
      const config={
        headers:{
          Authorization:`Bearer ${user.token}`,

      },
    };
    
      const {data}=await axios.get(`https://chat-mingle-backend.onrender.com/api/message/${selectedChat._id}`,
        
      config);
      console.log(data);
      setMessages(data);
      socket.emit("joinchat",selectedChat._id);
      
            
    }
    catch(error){
      console.log("error")
      toast({
        title: "failed to load message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

    }
  

  };
  useEffect(()=>{
    socket=io("https://chat-mingle-backend.onrender.com");
    socket.emit("setup",user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    

  
  },[]);

 useEffect(()=>{
  fetchMessages();
  selectedChatCompare=selectedChat;
},[selectedChat]);


useEffect(()=>{
  
  socket.on("message recieved", (messagerecieved) => {
    //console.log("mesadsdh");
   if( !selectedChatCompare||selectedChatCompare._id!=messagerecieved.chat._id)
   {
    if(!notification.includes(messagerecieved)){
      setNotification([messagerecieved,...notification]);
      setFetchAgain(!fetchAgain);
      // console.log("notification");
    }
   }
   else{
    //console.log("messagerecieved");
    setMessages([...messages,messagerecieved]);

   }

  });
 

});
const typingHandler=(e)=>{
  setnewMessage(e.target.value);
  //console.log("message");
  if (!socketConnected) return;

  if (!typing) {
    setTyping(true);
    socket.emit("typing", selectedChat._id);
  }
  let lastTypingTime = new Date().getTime();
  var timerLength = 3000;
  setTimeout(() => {
    var timeNow = new Date().getTime();
    var timeDiff = timeNow - lastTypingTime;
    if (timeDiff >= timerLength && typing) {
      socket.emit("stop typing", selectedChat._id);
      setTyping(false);
    }
  }, timerLength);

}


  return (
    <>
    
  
    {selectedChat?
    <>
   
    <Box
    padding="2"
    display="flex"
    width="100%"
    alignItems="center"
    justifyContent={{base:"space-between"}}
    >
        <IconButton
        display={{base:"flex",md:"none"}}
        icon={<ArrowBackIcon/>}
        onClick={()=>setSelectedChat("")}
         />
       <Text
         fontSize={{ base: "28px", md: "30px" }}
         fontFamily="Work sans"
         >{messages &&
          (!selectedChat.isGroupChat ? (
            <>
              {getSender(selectedChat.users,user)}
              <Profilemodal
                user={getSenderFull( selectedChat.users,user)}
              />
            </>
          ) :(
            <>
        <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        </>
          ))}
         </Text> 
         </Box>
         <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          p={3}
          bg="#E8E8E8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"

         >
          {loading?<Spinner
          size="xl"
          w={20}
          h={20}
          alignSelf="center"
          margin="auto"
          
          />:
         
          
          <div className="messages"><ScrollableChat messages={messages}/></div>
}
   
          <FormControl
           onKeyDown={sendMessage}
          mt={3}
          isRequired
          
          >
            {istyping?
             <Lottie
             options={defaultOptions}
              height={40}
             width={70}
             style={{ marginBottom: 15, marginLeft: 0 }}
           />
            :<></>}
            <Input
            placeholder='enter message'
            background="#E0E0E0"
            value={newmessage}
             onChange={typingHandler}
            
            
             /> 
           

          </FormControl>
        

         </Box>
         </>


       
    :(
      <>
    <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="100%"

    >
        <Text fontSize="3xl" fontFamily="Work sans">
        Click on a user to start Chatting
        </Text>
        

    </Box>
    </>
    )}
    
    
    </>
  )

}

export default SingleChat;
