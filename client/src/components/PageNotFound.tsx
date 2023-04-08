import React from "react";
import { Heading, Text, Button, Box, Square } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Square style={{ width: "100%", height: "100vh" }}>
        <Box textAlign="center" color="sm.sparkle" py={10} px={6}>
          <Heading display="inline-block" as="h2" size="2xl">
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            Page Not Found
          </Text>
          <Text mb={6}>The page you're looking for does not seem to exist</Text>

          <Button
            color="sm.sparkle"
            colorScheme="yellow"
            bgGradient="linear(to-r, yellow.400, yellow.500, yellow.600)"
            variant="solid"
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </Box>
      </Square>
    </Box>
  );
};

export default PageNotFound;
