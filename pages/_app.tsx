import '@fontsource/bungee-outline';
import '@fontsource/inconsolata';
import '@fontsource/jura';

import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import theme from '../styles/theme';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
        <link href="/favicon.ico" rel="icon" sizes="64x64 32x32 24x24 16x16" type="image/x-icon" />
        <link href="/logo192.png" rel="apple-touch-icon" />
        <link href="/manifest.json" rel="manifest" />
        <title>Genetic Algorithm V2</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
