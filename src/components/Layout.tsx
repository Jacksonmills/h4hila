import { SignIn, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React from 'react';
import { Edit, HelpCircle, Settings, Smile, User } from 'react-feather';

export default function Layout({ children }: { children: React.ReactNode; }) {
  const { isSignedIn } = useUser();

  return (
    <>
      <Head>
        <title>hoe4hila</title>
        <meta name="description" content="Tinder-like app for the H3Podcast fan base" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center overflow-hidden" style={{ backgroundImage: `url('/img/bg.png')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
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
  const [tooltip, setTooltip] = React.useState(false);
  const [opacity, setOpacity] = React.useState(0);

  const toggleTooltip = () => {
    setTooltip((prev) => {
      if (prev) {
        setOpacity(0);
      } else {
        setTimeout(() => { setOpacity(1); }, 75);
      }
      return !prev;
    });
  };

  const opacityStyles = opacity === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto';
  const transformStyles = opacity === 0 ? 'translate-y-0' : 'translate-y-2';

  return (
    <div className="w-screen flex items-center px-4 py-2">
      <h1 className="flex items-center justify-center text-2xl font-bold text-white bg-black px-2 pb-1 md:pb-2 pointer-events-none select-none md:text-4xl">[h4h]</h1>
      <div className="ml-auto flex items-center gap-4 text-white">
        {isSignedIn && (
          <button
            className='bg-h3Pink rounded-full p-1 md:relative'
            onClick={toggleTooltip}
          >
            <HelpCircle />
            {tooltip && (
              <div className={`absolute z-10 md:top-8 right-0 bg-white text-black rounded-xl shadow-lg p-4 w-[400px] transition-all duration-100 delay-75 ${opacityStyles} ${transformStyles}`}>
                <div className='relative flex flex-col gap-2'>
                  <h2 className='text-left text-xl'>FAQ</h2>
                  <div className='p-2 bg-h3Pink rounded-md text-left'>
                    <p className='text-sm font-bold'>Q: What is this?</p>
                    <p className='text-sm'>A: Tinder-like app for the H3Podcast fan base</p>
                  </div>
                  <div className='p-2 bg-h3Blue rounded-md text-left'>
                    <p className='text-sm font-bold'>Q: How do I use it?</p>
                    <p className='text-sm'>A: Sign in with your Discord account and start swiping!</p>
                  </div>
                  <div className='p-2 bg-h3Purple rounded-md text-left'>
                    <p className='text-sm font-bold'>Q: How do I get my profile picture?</p>
                    <p className='text-sm'>A: Your profile picture is your Discord profile picture, or change it with the Clerk settings.</p>
                  </div>
                  <div className='p-2 bg-h3LightBlue rounded-md text-left'>
                    <p className='text-sm font-bold'>Q: How do I change my bio?</p>
                    <p className='text-sm'>A: You can change your bio by clicking the change bio button in the navigation.</p>
                  </div>
                  <div className='p-2 text-left divide-solid text-gray-300 flex flex-col gap-4'>
                    <div className='h-[1px] bg-gray-200 w-[400px] ml-[-24px]' />
                    <p>Powered by insert h3podcast joke here</p>
                  </div>
                </div>
              </div>
            )}
          </button>
        )}
        <button className='bg-h3Pink rounded-md p-1 md:relative'>
          <Edit />
        </button>
        {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <Smile />}
      </div>
    </div>
  );
};
