import React from 'react';
import { Container,Box,Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from "../Components/Authentication/Login"
import Signup from "../Components/Authentication/Signup"
import { ChatState } from '../Context/Chatprovider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {user}=ChatState();
  const navigate=useNavigate();
  if(user)navigate("/chats");
  return (
  

    <Container maxW="xl"  >
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
       width="100%"
        m="50px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        >
          <Text textAlign="center" fontSize="3xl" fontFamily="Work sans">Talk-A-Tive</Text>
       
      </Box>
      <Box p={3} bg="white" width="100%" borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded'>
  <TabList>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Signup</Tab>
    
  </TabList>

  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Signup />
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
       
  
    </Container>
  
  );
}

export default Home;
