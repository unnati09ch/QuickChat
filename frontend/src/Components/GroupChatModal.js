import React, { useState } from 'react';
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
    Input,
    Box,
  } from '@chakra-ui/react'
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { ChatState } from '../Context/Chatprovider';
import axios from 'axios';
import { useToast } from "@chakra-ui/toast";
import UserListItem from './UserListItem';
import UserBadgeItem from './UserBadgeItem';

const GroupChatModal = ({children}) => {
  const toast=useToast();
  const[Loading,setLoading]=useState(false);

    const[name,setGroupName]=useState("");
    const[groupmembers,SetGroupMembers]=useState([]);
    const[selectedmembers,SetSelectedMembers]=useState([]);

  const{user,chats,setChats}=ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChange=async(search)=>{
        if(!search){
          // SetSelectedMembers([]);
          
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
          const {data}=await axios.get(`https://chat-mingle-backend.onrender.com/api/user/getusers?search=${search}`,config);
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
    const handleGroup=(groupmember)=>{
      if(selectedmembers.includes(groupmember)){
        toast({
          title: "User already added",
      
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
        
      }
      
      SetSelectedMembers([...selectedmembers,groupmember])
      

    }
    const handleDelete=(deletemember)=>{
      
      
       SetSelectedMembers(selectedmembers.filter((member)=>member._id!==deletemember._id));
    }
    const handleSubmit=async()=>{
      if(!name||!selectedmembers)
      {
        toast({
          title: "Plese fill all the fields",
      
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
      const{data}=await axios.post("https://chat-mingle-backend.onrender.com/api/chats/group",
      {
        name:name,
        users:selectedmembers

      },
      config
        );
        setChats([data,...chats]);
        toast({
          title: " New Group Creted",
      
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        onClose();

      }
      catch(error){
        toast({
          title: "Failed to create group",
          description:error.response.data,
      
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        

      }

    }
    return(
  
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          display="flex"
          justifyContent="center"
          fontFamily="Work sans"
          >
            Create New Group
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center" >
          <FormControl>
       <Input type='text' placeholder="Chat Name" marginBottom={4} onChange={(e)=>setGroupName(e.target.value)} />
        </FormControl>
      <FormControl>
  
       <Input type='text' placeholder="Add Users eg:John,Jack" onChange={(e)=>handleChange(e.target.value)} />
 
    </FormControl>
    <Box display="flex" width="100%" marginTop="2">
    {selectedmembers?.map((selectedmember)=>{
      return <UserBadgeItem 
      member={selectedmember}
      handleFunction={()=>handleDelete(selectedmember)}
      />
      

    })}
    </Box>
    

    {Loading?<div>Loading...</div>:(
      groupmembers?.slice(0,4).map((groupmember)=>{
       return <UserListItem 
        User={groupmember}
       handleChat={()=>handleGroup(groupmember)}
        
         />

      })


    )}
   
            
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Create
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

   
  )
}

export default GroupChatModal
