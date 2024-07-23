import { Container, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from "axios";
import {
  FormControl,
  FormLabel,Input,Button,
} from '@chakra-ui/react';

import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[show1,setShow1]=useState(false);
  const toast = useToast();
  const navigate = useNavigate();
 
  function handleClick1()
  {
    setShow1(!show1);
  }
  async function handleSubmit()
  {
    
    try{
    const response=await axios.post("https://chat-mingle-backend.onrender.com/api/user/login",{email,password},{
      headers: {
          'Content-Type': 'application/json' // Set the content type
        }
      });
    console.log("login got data");
    //const data = await response.json();
    if(response.data.message){
      toast({
        title: "Error Occured!",
        description: response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
     
  }
  else{
   
    toast({
     
      title: "Login Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    localStorage.setItem("userInfo",JSON.stringify(response.data));
    console.log(localStorage.getItem("userInfo"));
    navigate("/chats");

      }
  }
  catch(error){
    console.log("error occuedds");
  }

  }
  
  
  return (
    <div>
     <VStack spacing="7px">
     
  <FormControl isRequired>
  <FormLabel>Email</FormLabel >
  <Input type='email' placeholder='Enter Email ' onChange={(e)=>setEmail(e.target.value)}  />
  </FormControl>
  <FormControl isRequired>
  <FormLabel>Password</FormLabel>
  <InputGroup>
  <Input type={show1?"text":"password"} placeholder='Enter Password '  onChange={(e)=>setPassword(e.target.value)} />
  <InputRightElement>
  <Button onClick={handleClick1}  size="sm">{show1?"Hide":"Show"}</Button>
  </InputRightElement>
  </InputGroup>
  </FormControl>
  <Button onClick={handleSubmit}width="100%" colorScheme='blue'marginTop="12px">Login</Button>

      </VStack>
      {/* //<ToastContainer /> */}
     
      
    </div>
  )
}

export default Login;

