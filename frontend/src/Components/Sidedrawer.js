import { Avatar, Box, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import React, { useState } from 'react';
import { ChatState } from '../Context/Chatprovider';
import Profilemodal from './Profilemodal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';
import { getSender } from '../config/Chatlogic';
import { BellIcon } from '@chakra-ui/icons';


const Sidedrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate=useNavigate();
  const toast=useToast();
  const {user,setSelectedChat,chats,setChats,notification,setNotification} = ChatState();
  const[searchResult,setSearchResult]=useState([]);
  const[search,setSearch]=useState();
  const[loading,setLoading]=useState(false);
  
  const logout=()=>{
    localStorage.removeItem("userInfo");
    navigate("/");
    
  }
  const handleClick=async()=>{
   
    if(!search){
      
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
    try{
      setLoading(true)
      const config={
        headers:{
          Authorization:`Bearer ${user.token}`,

      },
    };
      const {data}=await axios.get(`https://chat-mingle-backend.onrender.com/api/user/getusers?search=${search}`,config);
      setLoading(false);
      setSearchResult(data);
      

    }
    catch(error)
    {
      setLoading(false);
      toast({
        title: "Error occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      

    }

  }
  const accessChats=async(userId)=>{
    console.log("hi");
   
    
    try{
      const config={

        headers:{
          "Content-type": "application/json",
          Authorization:`Bearer ${user.token}`,
  
      },
    };
      const {data}=await axios.post("https://chat-mingle-backend.onrender.com/api/chats/",{userId},config);
      if(!chats.find((c)=>c._id==data._id)) setChats([data,...chats]);

      setSelectedChat(data);
      onClose();
      
     
    }
    catch{
      toast({
        title: "Error occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });


    }
  }
  return (
   
    <>
    <Box
    display="flex"
    width="100%"
    bg="white"
    justifyContent="space-between"
    alignItems="center"
    p="5px"
    borderWidth="5px"
   
    >
      
        <Tooltip label="click to search" hasArrow>
        <Button variant="ghost" onClick={onOpen}>
           <i class="ri-search-line" ></i>
           <Text px={3}>Search user </Text>
        </Button>
        </Tooltip>
        <Text d={{base:"none",md:"flex"}} fontSize={'2xl'}>
            Talk-A-Tive
        </Text>
        <div>
        <Menu>
          <MenuButton>
          <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
          <MenuList>
          {notification.length==0&&"No New Messages"}
          {notification.map((notify)=>(
            <MenuItem
            onClick={() => {
              setSelectedChat(notify.chat);
              setNotification(notification.filter((n) => n !== notify));
            }}
            >
           
            {notify.chat.isGroupChat?`New Message in ${notify.chat.chatName}`:`New Message from ${getSender(notify.chat.users,user.name)}`}
            {/* console.log(getSender(notify.chat.users,user));
            
            */}
            
            
            </MenuItem>
           
          ))
        }
        

          </MenuList>
         
          

        </Menu>
        <Menu>
      {/* //src= "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"/> */}
  <MenuButton as={Button} bg="white" rightIcon={<i class="ri-arrow-down-s-line"></i>}>
     <Avatar size="sm" name={user.name} src={user.pic}/> 
    </MenuButton>
    <MenuList>
      <Profilemodal user={user}>
      <MenuItem>Profile</MenuItem>
      </Profilemodal>
     
      <MenuDivider />
      <MenuItem onClick={logout}>Logout</MenuItem>
  
    </MenuList>
        </Menu>
        </div>
        
    </Box>
    
        
         <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search Users</DrawerHeader>
  
            <DrawerBody>
              <Box
      
              display="flex">
              
              <Input marginRight="2px" placeholder='enter name or email'  onChange={(e)=>setSearch(e.target.value)}  />
              <Button onClick={handleClick}>Go</Button>
              </Box>
            {loading?<ChatLoading />:searchResult?.map((result)=>{
              return <UserListItem 
              User={result}
              key={result._id}
               handleChat={()=>accessChats(result._id)}

              />


            })}
              
            
             
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              
            </DrawerFooter>
          </DrawerContent>
        </Drawer> 
      </>
    )
  }


export default Sidedrawer;
