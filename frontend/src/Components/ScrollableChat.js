import React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import { ChatState } from '../Context/Chatprovider';
import { isSamesender, isSameuser } from '../config/Chatlogic';
import { border } from '@chakra-ui/react';


const ScrollableChat = ({messages}) => {
  const{selectedChat,setSelectedChat,user}=ChatState();
  return (
   <ScrollableFeed>
    {messages && messages.map((message,i)=>(
     <div style={{display:"flex"}} >
      <span style={{background:message.sender._id==user._id?"#BEE3F8" : "#B9F5D0",
       borderRadius: "20px",
       padding: "5px 15px",
         maxWidth: "75%",
        marginLeft:isSamesender(messages,message,i,user),
        marginTop:isSameuser(messages,message,i)?3:10
    }}>
      {message.content}
      </span>
     </div>
      

    ))}

   </ScrollableFeed>
   );

};

export default ScrollableChat;
