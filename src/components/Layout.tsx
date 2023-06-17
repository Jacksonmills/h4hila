import { SignIn, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';
import { Settings, Smile, X } from 'react-feather';
import { type PostWithUser } from '~/pages';
import { api } from '~/utils/api';
import CardEditor from './CardEditor';
import Image from 'next/image';

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
      <main className="flex min-h-screen flex-col items-center overflow-hidden" style={{ backgroundImage: `url('/img/bg.png')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <Header isSignedIn={isSignedIn} currentUserCardData={currentUserCardData!} />
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

const Header = ({ isSignedIn, currentUserCardData }: { isSignedIn?: boolean; currentUserCardData: PostWithUser; }) => {
  const [showSettingsModal, setShowSettingsModal] = React.useState(false);

  const toggleTooltip = () => {
    setShowSettingsModal(!showSettingsModal);
  };

  return (
    <div className="w-screen flex items-center px-4 py-2">
      <h1 className="flex items-center justify-center text-2xl font-bold text-white bg-black px-2 pb-1 md:pb-2 pointer-events-none select-none md:text-4xl">[h4h]</h1>
      <div className="ml-auto flex items-center gap-4 text-white">
        {isSignedIn && (
          <>
            <button
              className='bg-h3Pink rounded-full p-1'
              onClick={toggleTooltip}
            >
              <div className='flex w-[30px] h-[30px]'>
                <Image src={currentUserCardData.author?.profileImageUrl as string} width={30} height={30} alt="profile picture" className="rounded-full object-cover" />
              </div>
            </button>
            {(showSettingsModal && isSignedIn) && (
              <div className="absolute z-10 top-0 right-0 bg-white text-black p-4 w-screen">
                <CardEditor data={currentUserCardData} toggleModal={setShowSettingsModal} />
                <button className="absolute top-5 left-5 md:top-1 md:left-5 bg-h3Pink text-white p-2 rounded-full" onClick={toggleTooltip}><X /></button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
