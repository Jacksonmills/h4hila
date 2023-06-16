import { SignIn, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';
import { Settings, Smile, User } from 'react-feather';

export default function Layout({ children }: { children: React.ReactNode; }) {
  const { isSignedIn } = useUser();
  const styles = {
    backgroundColor: "#002fff",
    backgroundImage: "radial-gradient(at 17% 30%, #be1879 0, transparent 73%), radial-gradient(at 14% 95%, #2563eb 0, transparent 26%), radial-gradient(at 60% 26%, #3721b6 0, transparent 37%), radial-gradient(at 33% 87%, #cc66ff 0, transparent 54%), radial-gradient(at 32% 65%, #6fabff 0, transparent 44%), radial-gradient(at 53% 68%, #a0c0ff 0, transparent 26%)",
  };

  return (
    <>
      <Head>
        <title>hoe4hila</title>
        <meta name="description" content="Tinder-like app for the H3Podcast fan base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center overflow-hidden" style={{ backgroundImage: `url('/img/bg.png')`, backgroundPosition: 'center' }}>
        <Header isSignedIn={isSignedIn} />
        <SignedOut>
          <div className='w-full h-screen grid place-content-center'>
            <SignIn />
          </div>
        </SignedOut>
        <SignedIn>
          {children}
        </SignedIn>
      </main>
    </>
  );
}

const Header = ({ isSignedIn }: { isSignedIn?: boolean; }) => {
  return (
    <div className="w-screen flex items-center px-4 py-2">
      <h1 className="text-2xl font-bold text-white pointer-events-none select-none md:text-4xl">[h4h]</h1>
      <div className="ml-auto flex items-center gap-2 text-white">
        {isSignedIn ? <UserButton /> : <Smile />}
      </div>
    </div>
  );
};
