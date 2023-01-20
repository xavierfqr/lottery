import { HomeSection } from '@/components/HomeSection';
import { Navbar } from '@/components/Navbar';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <HomeSection />
      </main>
    </>
  );
}
