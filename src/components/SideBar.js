import React, { useContext, useCallback } from "react";
import {
  Text,
  Button,
  IconButton,
  Box,
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
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useMoralis } from "react-moralis";
import { NavLink } from "react-router-dom";
import { Web3Context } from "../context";

export default function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { connect, account, logout } = useContext(Web3Context);
  const { user } = useMoralis();

  const btnRef = React.useRef();

  const toggleTheme = () => {
    toggleColorMode();
    localStorage.setItem("theme", colorMode);
  };

  const renderRoutes = useCallback(() => {
    if (!account)
      return (
        <div>
          <NavLink
            to="/"
            exact
            activeStyle={{
              fontWeight: "bold",
            }}
            onClick={onClose}
          >
            Home
          </NavLink>
        </div>
      );
    return (
      <>
        <div>
          <NavLink
            to="/"
            exact
            activeStyle={{
              fontWeight: "bold",
            }}
            onClick={onClose}
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
            onClick={onClose}
          >
            Dashboard
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/profile"
            exact
            activeStyle={{
              fontWeight: "bold",
            }}
            onClick={onClose}
          >
            Profile
          </NavLink>
        </div>
      </>
    );
  }, [account, onClose]);

  return (
    <>
      <Button
        m={5}
        ref={btnRef}
        colorScheme="cyan"
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
          <DrawerHeader>
            <Box mt={6}>
              {user && <Text mb={5}>Welcome, {user.attributes.username}!</Text>}
              {account ? (
                <Link
                  href={`https://explorer-mainnet.maticvigil.com/address/${account}`}
                  isExternal
                >
                  {account.substring(0, 6) + "..." + account.substring(36, 42)}{" "}
                  <ExternalLinkIcon mx="2px" />
                </Link>
              ) : (
                <Button onClick={connect}>Connect Wallet</Button>
              )}
            </Box>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={6}>{renderRoutes()}</Stack>
            {account && (
              <Button mt={6} onClick={logout}>
                Logout
              </Button>
            )}
          </DrawerBody>

          <DrawerFooter>
            <IconButton
              colorScheme="teal"
              size="lg"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleTheme}
              variant="outline"
              // variant="ghost"
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
