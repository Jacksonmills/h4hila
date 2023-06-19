import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';
import { api } from '~/utils/api';

import Header from './Header';
import Background from './Background';

export default function Layout({ children }: { children: React.ReactNode; }) {
  const { user, isSignedIn } = useUser();
  const { data } = api.posts.getAll.useQuery();
  if (!data) return null;

  const dataForCurrentUser = data?.filter((post) => {
    return post.post.authorId === user?.id;
  });

  const currentUserCardData = dataForCurrentUser?.[0];

  return (
    <>
      <Head>
        <title>[hoe4hila]</title>
        <meta name="description" content="Tinder-like app for the H3Podcast fan base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center overflow-hidden relative">
        <Header isSignedIn={isSignedIn} currentUserCardData={currentUserCardData} />
        <div className='grid place-content-center w-full h-full grow'>
          <SignedOut>
            <SignIn />
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
