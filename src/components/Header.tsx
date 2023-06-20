import { Home, RefreshCw, Settings } from "react-feather";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import { motion } from 'framer-motion';

export default function Header({ isSignedIn }: { isSignedIn?: boolean; }) {
  return (
    <div className="flex w-full items-center justify-center py-2">
      <div className='w-[0.75rem] sm:w-[1.75rem]' />
      <div className="flex items-center gap-2">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Logo />
          </motion.div>
        </Link>
        {/* <button className='text-black bg-black/0 hover:bg-black/20 rounded-full transition-colors duration-200 ease-in-out' onClick={() => window.location.reload()}>
          <div className='flex items-center justify-center p-[5px]'>
            <RefreshCw />
          </div>
        </button> */}
      </div>
      <div className="ml-auto flex items-center gap-4 text-white">
        {isSignedIn && (
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href="/settings" className='flex items-center justify-center p-[5px] rounded-full bg-h3LightBlue transition-colors duration-200 ease-in-out'>
                <Settings className="text-black" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <UserButton />
            </motion.div>
          </div>
        )}
      </div>
      <div className='w-[0.75rem] sm:w-[1.75rem]' />
    </div>
  );
}