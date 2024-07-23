import React from 'react';
import {ViewIcon} from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
    Image,
    Text
  } from '@chakra-ui/react'

const Profilemodal = ({children,user}) => {
 
    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
        <>
         {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
         {/* <Button onClick={onOpen}>Open Modal</Button>  */}

<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent >
    <ModalHeader
   fontFamily="Work sans"
   fontSize="40px"
   display="flex"
   justifyContent="center"
    >
    {user.name}
    </ModalHeader>
    <ModalCloseButton />
    <ModalBody 
   display="flex"
   flexDirection="column"
   justifyContent="space-between"
alignItems="center"
    >
    <Image
  borderRadius='full'
  boxSize='150px'
  src={user.pic}
  alt={user.name}
/>
<Text fontFamily="Work sans" fontSize={{base:"28px",md:"30px"}}>
    Email:{user.email}

</Text>
    </ModalBody>

    <ModalFooter>
      <Button onClick={onClose}>
        Close
      </Button>

    </ModalFooter>
  </ModalContent>
</Modal>

        </>
    );

}

export default Profilemodal;
