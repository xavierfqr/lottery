import React, { useEffect } from 'react';
import { useLotteryWithoutParameter } from '@/hooks/hooks';
import { Button, Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
const Winner = dynamic(() => import('./Winner'), { ssr: false });
import { neonCursor } from 'threejs-toys';

export const HomeSection = () => {
  const { isLoading, write } = useLotteryWithoutParameter('participate', '0.01');

  useEffect(() => {
    neonCursor({
      el: document.getElementById('app'),
      shaderPoints: 16,
      curvePoints: 80,
      curveLerp: 0.5,
      radius1: 5,
      radius2: 30,
      velocityTreshold: 10,
      sleepRadiusX: 100,
      sleepRadiusY: 100,
      sleepTimeCoefX: 0.0025,
      sleepTimeCoefY: 0.0025,
    });
  }, []);

  const handleParticipation = () => {
    write?.();
  };

  return (
    <div id="app" className="block fixed -z-10 top-0 w-full h-full">
      <Flex direction="column" align="center" justify="center" height="100vh" bg="transparent">
        <Button onClick={handleParticipation} isLoading={isLoading}>
          Participate
        </Button>
        <Winner />
      </Flex>
    </div>
  );
};
