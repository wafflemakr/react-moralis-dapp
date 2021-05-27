import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  DrawerHeader,
  DrawerCloseButton,
  Stack,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const btnRef = React.useRef();

  return (
    <>
      <Button
        m={5}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        variant="outline"
      >
        Menu
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Welcome!</DrawerHeader>

          <DrawerBody>
            <Stack spacing={6}>
              <div>
                <NavLink
                  to="/"
                  exact
                  activeStyle={{
                    fontWeight: "bold",
                  }}
                >
                  Home
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/dashboard"
                  exact
                  activeStyle={{
                    fontWeight: "bold",
                  }}
                >
                  Dashboard
                </NavLink>
              </div>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button onClick={toggleColorMode}>
              Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
