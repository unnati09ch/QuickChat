import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    Input,
    Box,
    useToast,
  } from '@chakra-ui/react';
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../Context/Chatprovider';
import UserBadgeItem from './UserBadgeItem';
import UserListItem from './UserListItem';
import { useState } from 'react';
import axios from 'axios';



const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast=useToast();
    const{selectedChat,setSelectedChat,user}=ChatState();
    const[Loading,setLoading]=useState(false);

    const[groupName,setGroupName]=useState("");
    const[groupmembers,SetGroupMembers]=useState([]);
    const Removeuser=async(member)=>{
      if(user._id!=selectedChat.groupAdmin._id&&user._id!=member._id){
        toast({
          title: "Only admins can remove someone",
      
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      try{
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`,
  
        },
      };
        const {data}=await axios.put("https://chat-mingle-backend.onrender.com/api/chats/remove",{
          chatId:selectedChat._id,
        userId:member._id

        },config);
        setFetchAgain(!fetchAgain);
        setSelectedChat(data);
       
      }
      catch{
        toast({
          title: "failed to remove",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });


      
    }
      
      
      
    }
    const Adduser=async(member)=>{
      
      //console.log(selectedChat.groupAdmin._id);
      
      if(user._id!==selectedChat.groupAdmin._id)
      {
        toast({
          title: "Only admins can add someone",
      
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;

      }

      if (selectedChat.users.find((u) => u._id == member._id)) {
       
       
        toast({
         
          title: "User already added",
      
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;

        
      }
      
      
      try{
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`,
  
        },
      };
        const {data}=await axios.put("https://chat-mingle-backend.onrender.com/api/chats/add",{
          chatId:selectedChat._id,
        userId:member._id

        },config);
        setFetchAgain(!fetchAgain);
        setSelectedChat(data);
       
      }
      catch{
        toast({
          title: "failed to add",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });


      
    }


  }

    const Renamegroup=async()=>{
       if(!groupName)return;
      try{
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`,
  
        },
      };
        const {data}=await axios.put("https://chat-mingle-backend.onrender.com/api/chats/rename",{
          Id:selectedChat._id,
          name:groupName

        },config);
        setFetchAgain(!fetchAgain);
        setGroupName("");

      }
      catch{
        toast({
          title: "failed to rename",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });


      }

    }
    const handleChange=async(search)=>{
      if(!search){
        SetGroupMembers([]);
        
        return;
      }
      else{
      
      try{
        setLoading(true)
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`,
  
        },
      };
        const {data}=await axios.get(`http://localhost:5000/api/user/getusers?search=${search}`,config);
        setLoading(false);
        SetGroupMembers(data);
        
  
      }
      catch(error)
      {
        setLoading(false);
        toast({
          title: "Error occured",
          
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
        
  
      }
    }
    

  }


  return (
    <>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontFamily="Work sans"
          fontSize="20px"
          display="flex"
          justifyContent="center"
          >
            {selectedChat.chatName}
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          w="100%" display="flex" flexDirection="column" alignItems="center"
          >
            <Box
            w="100%" display="flex" flexWrap="wrap" pb={3} 
            >
            
            {selectedChat.users.map((selectedmember)=>{
      return <UserBadgeItem 
      member={selectedmember}
      handleFunction={()=>Removeuser(selectedmember)}
      />
    
          })}
            </Box>
         
          <FormControl display="flex">
  
  <Input type='text'  placeholder="Chat Name" mb={3} onChange={(e)=>setGroupName(e.target.value)} />
  <Button colorScheme='teal' ml={1} onClick={Renamegroup}>Update</Button>

</FormControl>
<FormControl>
  
  <Input type='text' placeholder="Add User to Group" mb={1} onChange={(e)=>handleChange(e.target.value)}/>
  
</FormControl>
{Loading?<div>Loading...</div>:(
      groupmembers?.slice(0,4).map((groupmember)=>{
       return <UserListItem 
        User={groupmember}
       handleChat={()=>Adduser(groupmember)}
        
         />

      })


    )}
   


           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={()=>Removeuser(user)}>
              Leave Group
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

    
  )
}

export default UpdateGroupChatModal
