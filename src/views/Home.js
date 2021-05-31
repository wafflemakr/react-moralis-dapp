import React from "react";
import { Container, Heading, Image, Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW="xl" centerContent>
      <Heading>HOME PAGE</Heading>

      <Box mt={10} boxSize="lg">
        <Image
          src="  https://moralis.io/wp-content/uploads/2021/01/authentication-1024x772.png"
          alt="Segun Adebayo"
        />
      </Box>
    </Container>
  );
}
