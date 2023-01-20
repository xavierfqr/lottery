import { theme } from '@/config/theme';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { WagmiConfig, createClient } from 'wagmi';
import { goerli } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { useEffect } from 'react';

const client = createClient(
  getDefaultClient({
    autoConnect: false,
    appName: 'Lottery',
    chains: [goerli],
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
  })
);

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    client.autoConnect();
  }, []);

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
