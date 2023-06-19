import { Home, RefreshCw, Settings } from "react-feather";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Header({ isSignedIn }: { isSignedIn?: boolean; }) {
  return (
    <div className="flex w-full items-center justify-center py-2">
      <div className='w-[0.75rem] sm:w-[1.75rem]' />
      <div className="flex items-center gap-2">
        <h1 className="flex items-center justify-center text-2xl font-bold text-white bg-black px-2 pb-1 md:pb-2 pointer-events-none select-none md:text-4xl">[h4h]</h1>
        <Link href="/" className='text-black bg-black/0 hover:bg-black/20 rounded-full transition-colors duration-200 ease-in-out'>
          <div className='flex items-center justify-center p-[5px]'>
            <Home />
          </div>
        </Link>
        <button className='text-black bg-black/0 hover:bg-black/20 rounded-full transition-colors duration-200 ease-in-out' onClick={() => window.location.reload()}>
          <div className='flex items-center justify-center p-[5px]'>
            <RefreshCw />
          </div>
        </button>
      </div>
      <div className="ml-auto flex items-center gap-4 text-white">
        {isSignedIn && (
          <div className="flex items-center gap-2">
            <Link href="/settings" className='bg-h3Pink rounded-full hover:bg-h3HotPink transition-colors duration-200 ease-in-out'>
              <div className='flex items-center justify-center p-[5px]'>
                <Settings />
              </div>
            </Link>
            <UserButton />
          </div>
        )}
      </div>
      <div className='w-[0.75rem] sm:w-[1.75rem]' />
    </div>
  );
}