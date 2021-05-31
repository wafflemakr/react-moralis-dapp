import React, { useState } from "react";
import {
  Container,
  Button,
  Heading,
  Stack,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import history from "../history";
import notify from "../utils/notify";

export default function Profile() {
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { user, setUserData } = useMoralis();

  const saveData = () => {
    setUserData({
      username: formData.username,
      email: formData.email,
      password: formData.password === undefined ? "" : formData.password,
    })
      .then(() => {
        notify("success", "Success", "Data updated!", 3000);
        // setTimeout(() => {
        //   history.push("/");
        // }, 2000);
      })
      .catch((e) => notify("error", e.message, 3000));
  };

  return (
    <Container>
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading>PROFILE PAGE</Heading>
          </Box>
          <Box my={10} textAlign="left">
            <form>
              <Stack spacing="6">
                <FormControl fontSize="lg" id="email" colorScheme="teal">
                  <FormLabel fontWeight="bold">Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder={user?.attributes.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.currentTarget.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl fontSize="lg" id="username">
                  <FormLabel fontWeight="bold">Username</FormLabel>
                  <Input
                    type="text"
                    placeholder={user?.attributes.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.currentTarget.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl mb={6} fontSize="lg" id="password">
                  <FormLabel fontWeight="bold">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter new password"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.currentTarget.value,
                        })
                      }
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Box>
                  <Grid gap={5} mt={6}>
                    <GridItem colSpan={3} h="10">
                      <Button variant="solid" w="80%" onClick={saveData}>
                        Save
                      </Button>
                    </GridItem>
                    <GridItem colStart={5} colEnd={7} h="10">
                      <Button
                        variant="outline"
                        w="80%"
                        onClick={() => history.push("/")}
                      >
                        Cancel
                      </Button>
                    </GridItem>
                  </Grid>
                </Box>
              </Stack>
            </form>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
