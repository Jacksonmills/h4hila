import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';
import { api } from '~/utils/api';

import Header from './Header';
import Image from 'next/image';
import bgImage from '../../public/img/bg.webp';

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
        <title>hoe4hila</title>
        <meta name="description" content="Tinder-like app for the H3Podcast fan base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center overflow-hidden relative">
        <Header isSignedIn={isSignedIn} currentUserCardData={currentUserCardData} />
        <SignedOut>
          <div
            className='w-full h-screen grid place-content-center'
          >
            <SignIn />
          </div>
        </SignedOut>
        <SignedIn>
          {children}
        </SignedIn>

        <div className='absolute top-0 left-0 z-[-1] h-screen w-screen'>
          <Image src={bgImage} alt="background image" className='object-cover w-full h-full' priority />
        </div>
      </main>
    </>
  );
}
