import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';

import Header from './Header';
import Background from './Background';

export default function Layout({ children }: { children: React.ReactNode; }) {
  const { isSignedIn } = useUser();
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

  return (
    <>
      <Head>
        <title>HOE4HILA</title>
        <meta name="description" content="Tinder-like app for the H3Podcast fan base" />

        <meta property="og:image" content={`${baseUrl}/image/meta.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="HOE4HILA Logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${baseUrl}/image/meta.png`} />
        <meta name="twitter:image:alt" content="HOE4HILA Logo" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

        <meta name="theme-color" content="#7ed9f8" />
      </Head>
      <main className="flex min-h-screen flex-col items-center overflow-hidden relative">
        <Header isSignedIn={isSignedIn} />
        <div className='flex flex-col items-center justify-start w-full h-full grow px-[0.75rem] sm:px-[1.75rem]'>
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
