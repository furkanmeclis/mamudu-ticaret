import React from 'react';
import { Stack, Box, VStack } from '@chakra-ui/react';
export default function App() {
  return (
    <Box w="full" display="flex" h="full" alignItems="center" justify="center">
      <Box w="40px" h="full" bg="yellow.200">
        1
      </Box>
      <Box w="40px" h="40px" bg="tomato">
        2
      </Box>
    </Box>
  );
}
