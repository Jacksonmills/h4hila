import { SignIn, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';
import { Settings, Smile, User } from 'react-feather';

export default function Layout({ children }: { children: React.ReactNode; }) {
  const { isSignedIn } = useUser();

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
          <div
            className='w-full h-screen grid place-content-center'
            style={{ height: "calc(100vh - var(--header-height))" }}
          >
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
      <h1 className="flex items-center justify-center text-2xl font-bold text-white bg-h3Pink px-4 pb-1 md:pb-2 rounded-full pointer-events-none select-none md:text-4xl">[h4h]</h1>
      <div className="ml-auto flex items-center gap-2 text-white">
        {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <Smile />}
      </div>
    </div>
  );
};
