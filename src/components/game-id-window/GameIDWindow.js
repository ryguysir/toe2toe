import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

const GameIDWindow = ({ gameID }) => {
  return (
    <Flex
      justifyContent="center"
      width="346px"
      p={3}
      roundedBottom={6}
      background="gray.200"
      zIndex={5}
    >
      <Heading color="teal.500">{gameID}</Heading>
    </Flex>
  );
};

export default GameIDWindow;
