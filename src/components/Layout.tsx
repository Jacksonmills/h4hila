import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';

import Header from './Header';
import Background from './Background';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>HOE4HILA</title>
      </Head>
      <main className='relative flex min-h-screen flex-col items-center overflow-hidden'>
        <Header isSignedIn={isSignedIn} />
        <div className='flex h-full w-full grow flex-col items-center justify-start px-[0.75rem] sm:px-[1.75rem]'>
          {router.route.includes('lighthouse') ? (
            <>{children}</>
          ) : (
            <>
              <SignedOut>
                <div className='flex grow items-center justify-center'>
                  <SignIn />
                </div>
              </SignedOut>
              <SignedIn>{children}</SignedIn>
            </>
          )}
          <Background />
        </div>
      </main>
    </>
  );
}
