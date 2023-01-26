import { Grid, GridItem, Text } from '@chakra-ui/react';
import { ConnectKitButton } from 'connectkit';
import React from 'react';

export const Navbar = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" justifyItems="center" p={3} position="absolute" w="100%">
      <GridItem colStart={3}>
        <Text fontSize="3xl" m="auto">
          Lottery
        </Text>
      </GridItem>
      <GridItem colStart={5} justifySelf="right">
        <ConnectKitButton />
      </GridItem>
    </Grid>
  );
};
