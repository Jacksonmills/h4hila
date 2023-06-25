import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import Header from './Header';
import Background from './Background';
import { useRouter } from 'next/router';
import Modal from './Modal';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [ageLimitModalOpen, setAgeLimitModalOpen] = useState(false);
  const { isSignedIn } = useUser();

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
        <title>HOE4HILA</title>
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
              <div className='flex w-[90vw] flex-col items-center justify-between gap-4 rounded-2xl border-2 border-black bg-white p-6 md:w-[400px] md:p-4'>
                <h1 className='text-center text-2xl font-bold'></h1>
                <p className='text-center text-lg'>
                  This website is only for people over 18 years old. Although
                  content is not explicit, it is not suitable for minors. By
                  clicking &quot;Yes&quot; you confirm that you are over 18
                  years old.
                </p>
                <div className='flex items-center justify-center'>
                  <button
                    className='mr-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600'
                    onClick={() => {
                      localStorage.setItem('ageLimit', 'true');
                      setAgeLimitModalOpen(false);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600'
                    onClick={() => {
                      console.log('21 fuck you');
                    }}
                  >
                    No
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
