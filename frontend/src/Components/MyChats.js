import React, { useEffect } from 'react';
import { ChatState } from '../Context/Chatprovider';
import { Box, Button, Stack, Text, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { useToast } from "@chakra-ui/toast";

import axios from 'axios';
import {getSender} from '../config/Chatlogic';
import GroupChatModal from './GroupChatModal';


const MyChats = ({fetchAgain}) => {
  const {user,selectedChat,setSelectedChat,chats,setChats} = ChatState();
    
    const toast=useToast();
    
    const fetchChats=async()=>{
      try{
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`,
  
        },
      };
        const{data}=await axios.get("http://localhost:5000/api/chats/",config);
        
        setChats(data);
        console.log(chats.size);


      }
      catch{
        toast({
          title: "failed to load chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });

      }
    };
    useEffect(()=>{
      fetchChats();

    },[fetchAgain]);

  return(
  
   <Box display={{base:selectedChat?"none":"flex",md:"flex"}}
    flexDirection="column"
    
    width={{base:"100%",md:"30%"}}
    bg="white"
    p={3}
    borderRadius="lg"
    borderWidth="1px"
    
    >
       <Box
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      fontSize="30px"
      fontFamily="Work sans"

      >
      <Text>My Chats</Text>
      <GroupChatModal>
      <Button display="flex"
      fontSize={{base:"15px",md:"10px",lg:"15px"}}
      rightIcon={<AddIcon />}
      >
        
        New Group Chat</Button>
      </GroupChatModal>
     
      </Box>
      <Box
      display="flex"
      flexDirection="column"
      w="100%"
      h="100%"
      overflowY="hidden"
      p={3}

      
      >
      
        {chats?(
          <Stack overflowY="scroll">
      {
      chats.map((c)=>(
        <Box
         onClick={()=>setSelectedChat(c)}
        cursor="pointer"
       bg={selectedChat==c ? '#38B2AC':"#E8E8E8"}
       color={selectedChat==c ? "white":"black"}
      p={2}
      borderRadius="lg"
      //marginTop="10px"
      key={c._id}
        >
         <Text>{!c.isGroupChat?(getSender(c.users,user.name)):c.chatName}</Text>
        
          </Box>
         
      ))}
      </Stack>
      ):(<ChatLoading />) 
       }
   

        </Box>
        </Box>
        );
      };
      export default MyChats;
      

 


      
        
      