import { Spinner, Text } from '@chakra-ui/react'
import React from 'react'

function Spinners() {
 return (
  <Spinner
   thickness="4px"
   speed="0.65s"
   emptyColor="gray.200"
   color="blue.500"
   size="xl"
   role="status"
   position="absolute"
   zIndex="9999"
   top="50%"
   left="50%"
   transform="translate(-50%, -50%)"
  />
 )
}

export default Spinners
