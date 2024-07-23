import React from 'react'
import { ChatState } from '../Context/Chatprovider';
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

const Chatbox = ({fetchAgain,setFetchAgain}) => {
  const{selectedChat}=ChatState();
  return (
    <Box
    display={{base: selectedChat ? "flex" : "none", md: "flex"}}
    flexDirection="column"
    bg="white"
    alignItems="center"
    borderRadius="lg"
    borderWidth="1px"
    w={{base:"100%",md:"68%"}}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />


    </Box>
    
  )
}

export default Chatbox;
