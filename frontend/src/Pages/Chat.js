import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/Chatprovider';
import Sidedrawer from '../Components/Sidedrawer';
import MyChats from '../Components/MyChats';
import Chatbox from '../Components/Chatbox';
import { Box } from '@chakra-ui/react';

const Chat=()=>{
  const { user } = ChatState();
  const[fetchAgain,setFetchAgain]=useState(false);
  return <div style={{width:"100%"}}>
{ user&& <Sidedrawer />}
<Box display="flex" justifyContent="space-between" width="100%" height="91.5vh" p="10px">
  {user && <MyChats fetchAgain={fetchAgain}/>}
  {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
  

</Box>

  
  </div>
}

export default Chat;
