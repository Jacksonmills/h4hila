import { Settings, Volume2, VolumeX } from 'react-feather';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import Logo from './Logo';
import { motion } from 'framer-motion';
import { useSoundEnabledContext } from '~/context/SoundEnabledContext';

export default function Header({ isSignedIn }: { isSignedIn?: boolean }) {
  const { soundEnabled, toggleSoundEnabled } = useSoundEnabledContext();

  return (
    <div className='flex w-full items-center justify-center py-2'>
      <div className='w-[0.75rem] sm:w-[1.75rem]' />
      <div className='mr-auto flex items-center gap-2'>
        <Link href='/'>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Logo />
          </motion.div>
          <span className='sr-only'>HOE4HILA Homepage Link</span>
        </Link>
        {/* <button className='text-black bg-black/0 hover:bg-black/20 rounded-full transition-colors duration-200 ease-in-out' onClick={() => window.location.reload()}>
          <div className='flex items-center justify-center p-[5px]'>
            <RefreshCw />
          </div>
        </button> */}
      </div>
      {isSignedIn && (
        <div className='flex items-center gap-2 text-white md:gap-4'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSoundEnabled}
          >
            <div className='flex items-center justify-center rounded-full bg-h3LightBlue p-[8px] transition-colors duration-200 ease-in-out'>
              {soundEnabled ? (
                <Volume2 className='text-black' />
              ) : (
                <VolumeX className='text-black' />
              )}
              <span className='sr-only'>Toggle sound</span>
            </div>
          </motion.button>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href='/settings'
              className='flex items-center justify-center rounded-full bg-h3LightBlue p-[8px] transition-colors duration-200 ease-in-out'
            >
              <Settings className='text-black' />
              <span className='sr-only'>Settings page Link</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <UserButton
              afterSignOutUrl='/'
              appearance={{
                elements: {
                  userButtonBox: 'bg-h3LightBlue rounded-full p-1',
                },
              }}
            />
          </motion.div>
        </div>
      )}
      <div className='w-[0.75rem] sm:w-[1.75rem]' />
    </div>
  );
}
