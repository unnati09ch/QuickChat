import { InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from 'axios';
import {
  FormControl,
  FormLabel,Input,Button,
} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
const Signup = () => {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[confirmpassword,setConfirmPassword]=useState("");
  
  
  const[show1,setShow1]=useState(false);
  const[show2,setShow2]=useState(false);
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  function handleClick1()
  {
    setShow1(!show1);
  }
  function handleClick2()
  {
    setShow2(!show2);
  }
  async function handleSubmit()
  {
    setPicLoading(true);
    try{
    const response=await axios.post("http://localhost:5000/api/user/signup",{name,email,password,confirmpassword,pic},{
      headers: {
          'Content-Type': 'application/json' // Set the content type
        }
      });
    console.log("signup got data");
    console.log(response);
    if(response.data){
      toast({
        title: "Error Occured!",
        description: response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      
     
   
 
  }
  else{
    toast({
      title: "Signup Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);

      
     
      }
  
  }
  catch(error){
    console.log("error");
    setPicLoading(false);
  }

  }
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "drzyxaich");
      fetch("https://api.cloudinary.com/v1_1/drzyxaich/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  

  return (
    <div>
     <VStack spacing="7px">
     
      <FormControl isRequired>
  <FormLabel>Name</FormLabel>
  <Input type='text' placeholder='Enter Name ' onChange={(e)=>setName(e.target.value)}/>
  </FormControl>
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
  <FormControl isRequired>
  <FormLabel>Confirm Password</FormLabel>
  <InputGroup>
  <Input type={show2?"text":"password"} placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} />
  <InputRightElement>
  <Button onClick={handleClick2}  size="sm">{show2?"Hide":"Show"}</Button>
  </InputRightElement>
  </InputGroup>
  </FormControl>
  //
  <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
  <Button onClick={handleSubmit} isLoading={picLoading} width="100%" colorScheme='blue'marginTop="12px">Signup</Button>

      </VStack>
      {/* //<ToastContainer /> */}
      
    </div>
  )
}

export default Signup;
