import React from 'react';
import { Badge } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const UserBadgeItem = ({member,handleFunction}) => {
  return (
    <Badge 
    onClick={handleFunction}
    colorScheme="purple"
    variant="solid"
    m="1"
    p="1"
    px="2"
    cursor="pointer"
    fontSize="12"
    borderRadius="lg"
    
    >
      {member.name}
      <CloseIcon pl="1"/>
    </Badge>
   
  )
}

export default UserBadgeItem;
