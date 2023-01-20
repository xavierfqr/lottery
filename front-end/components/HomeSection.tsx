import React from 'react';
import { useLotteryWithoutParameter } from '@/hooks/hooks';
import { Button, Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
const Winner = dynamic(() => import('./Winner'), { ssr: false });

export const HomeSection = () => {
  const { isLoading, write } = useLotteryWithoutParameter('participate', '0.01');

  const handleParticipation = () => {
    write?.();
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh" bgColor="blue.100">
      <Button onClick={handleParticipation} isLoading={isLoading}>
        Participate
      </Button>
      <Winner />
    </Flex>
  );
};
