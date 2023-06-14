import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { PlusSquare } from 'react-feather';

export default function Layout({ children }: { children: React.ReactNode; }) {
  const styles = {
    backgroundColor: "#002fff",
    backgroundImage: "radial-gradient(at 17% 30%, #be1879 0, transparent 73%), radial-gradient(at 14% 95%, #2563eb 0, transparent 26%), radial-gradient(at 60% 26%, #3721b6 0, transparent 37%), radial-gradient(at 33% 87%, #cc66ff 0, transparent 54%), radial-gradient(at 32% 65%, #6fabff 0, transparent 44%), radial-gradient(at 53% 68%, #a0c0ff 0, transparent 26%)",
  };
  return (
    <>
      <Head>
        <title>HOE4HILA</title>
        <meta name="description" content="Tinder-like app for the H3Podcast fanbase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden" style={styles}>
        <SignedOut>
          <SignIn />
        </SignedOut>
        <SignedIn>
          <Header />
          {children}
        </SignedIn>
      </main>
    </>
  );
}

const Header = () => {
  return (
    <div className="fixed top-0 w-screen flex items-center px-4 py-2">
      <Link href="/">
        <h1 className="text-4xl font-bold text-white pointer-events-none select-none">HOE<span className="text-secondary">4</span>HILA</h1>
      </Link>
      <div className="ml-auto flex items-center gap-6 text-white">
        <Link href="/create"><PlusSquare /></Link>
        <UserButton />
      </div>
    </div>
  );
};
