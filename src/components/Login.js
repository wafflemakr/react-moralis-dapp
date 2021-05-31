import React, { useRef, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export default function Login({ login, close }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const initialRef = useRef();
  const finalRef = useRef();

  useEffect(() => {
    onOpen();

    return () => {
      close();
    };
  }, [onOpen, close]);

  const handleClose = () => {
    onClose();
    close();
  };

  const handleLogin = () => {
    try {
      console.log(username, password);
      login(username, password);
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              ref={initialRef}
              placeholder="username"
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleLogin}>
            Login
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
