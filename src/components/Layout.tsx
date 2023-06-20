import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';

import Header from './Header';
import Background from './Background';

export default function Layout({ children }: { children: React.ReactNode; }) {
  const { isSignedIn } = useUser();

  return (
    <>
      <Head>
        <title>HOE4HILA</title>
        <meta name="description" content="Tinder-like app for the H3Podcast fan base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center overflow-hidden relative">
        <Header isSignedIn={isSignedIn} />
        <div className='flex flex-col items-center justify-start w-full h-full grow'>
          <SignedOut>
            <div className='flex items-center justify-center grow'>
              <SignIn />
            </div>
          </SignedOut>
          <SignedIn>
            {children}
          </SignedIn>
          <Background />
        </div>
      </main>
    </>
  );
}
