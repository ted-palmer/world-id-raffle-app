import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import NFTViewer from '../components/NFTViewer';
import Widget from '../components/WorldIDWidget';

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>World ID Raffle</title>
        <meta
          name="description"
          content="A raffle app that uses World ID."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='mx-auto flex flex-col items-center pt-12 gap-y-4'>
        <ConnectButton />
        <NFTViewer />
        <Widget />
      </main>
    </div>
  );
};

export default Home;
