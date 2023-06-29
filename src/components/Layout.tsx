import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import Header from './Header';
import Background from './Background';
import { useRouter } from 'next/router';
import Modal from './Modal';
import { useSoundEnabledContext } from '~/context/SoundEnabledContext';
import useSound from 'use-sound';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser();
  const { soundEnabled } = useSoundEnabledContext();
  const [ageLimitModalOpen, setAgeLimitModalOpen] = useState(false);

  const [play] = useSound('/soundbites/aiden_21_fuck_you.mp3', {
    volume: 0.25,
    soundEnabled,
  });

  const router = useRouter();

  useEffect(() => {
    const ageLimit = localStorage.getItem('ageLimit');
    if (ageLimit !== 'true') {
      setAgeLimitModalOpen(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>HOE4HILA | The Unofficial H3 Dating App 🔥</title>
      </Head>
      <main className='relative flex min-h-screen flex-col items-center overflow-hidden'>
        <Header isSignedIn={isSignedIn} />
        <div className='flex h-full w-full grow flex-col items-center justify-start px-[0.75rem] sm:px-[1.75rem]'>
          {router.route.includes('lighthouse') ? (
            <>{children}</>
          ) : (
            <>
              {!ageLimitModalOpen && (
                <>
                  <SignedOut>
                    <div className='flex grow items-center justify-center'>
                      <SignIn afterSignInUrl='/' afterSignUpUrl='/settings' />
                    </div>
                  </SignedOut>
                  <SignedIn>{children}</SignedIn>
                </>
              )}
            </>
          )}
          {ageLimitModalOpen && (
            <Modal title='Must be 18+'>
              <div className='flex w-[94vw] flex-col items-center justify-between gap-4 rounded-2xl border-2 border-black bg-white p-6 md:w-[400px] md:p-4'>
                <p className='text-center text-lg'>
                  {`
                    Heads up! HOE4HILA is a space for those 18 and older. While we
                    don't feature explicit content, the site's nature is best
                    suited for mature audiences. By clicking 'Yes', you confirm
                    you're 18 or older. Help us keep this a fun, safe space for
                    all.
                  `}
                </p>
                <div className='flex w-full items-center justify-center gap-2'>
                  <button
                    className='w-full rounded-xl bg-h3LightBlue px-6 py-4 font-bold text-black hover:bg-h3LightBlue/60'
                    onClick={() => {
                      localStorage.setItem('ageLimit', 'true');
                      setAgeLimitModalOpen(false);
                    }}
                  >
                    YUP
                  </button>
                  <button
                    className='w-full rounded-xl bg-h3HotPink px-6 py-4 font-bold text-white hover:bg-h3HotPink/60'
                    onClick={() => play()}
                  >
                    NOPE
                  </button>
                </div>
              </div>
            </Modal>
          )}
          <Background />
        </div>
      </main>
    </>
  );
}
