import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
// import axios from 'axios';
// import { useToast } from 'react-toastify';
// import { ChatState } from '../Context/Chatprovider';


const UserListItem = ({User,handleChat}) => {


  return (
    <Box 
     onClick={handleChat}
    display="flex" 
    marginTop="8px"
    width="100%"
    p={2}
    alignItems="center"
    borderRadius="lg"
    bg="#E8E8E8"
    fontSize="sm"
    color="black"
    _hover={{
        bg: '#38B2AC',
        cursor: 'pointer',
        color:"white"
      }}>
       <Avatar size="sm" name={User.name} src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"/>
       <Box
       marginLeft={2}
       color="black">
        <Text>{User.name}</Text>
        <Text>
            <b>Email:</b> {User.email}
            </Text>
       </Box>

    </Box>
    
  )
}

export default UserListItem;
