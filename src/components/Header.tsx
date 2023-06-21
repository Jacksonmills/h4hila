import { Settings, Volume2, VolumeX } from 'react-feather';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import Logo from './Logo';
import { motion } from 'framer-motion';
import { useSoundEnabledContext } from '~/context/SoundEnabledContext';
import NavButton from './NavButton';

export default function Header({ isSignedIn }: { isSignedIn?: boolean }) {
  const { soundEnabled, toggleSoundEnabled } = useSoundEnabledContext();

  return (
    <div className='flex w-full items-center justify-center py-2'>
      <div className='w-[0.75rem] sm:w-[1.75rem]' />
      <div className='mr-auto flex items-center gap-2'>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href='/'>
            <Logo />
            <span className='sr-only'>HOE4HILA Homepage Link</span>
          </Link>
        </motion.div>
      </div>
      {isSignedIn && (
        <div className='flex items-center gap-2 text-white md:gap-4'>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <NavButton onClick={toggleSoundEnabled}>
              {soundEnabled ? (
                <Volume2 className='text-black' />
              ) : (
                <VolumeX className='text-black' />
              )}
              <span className='sr-only'>Toggle sound</span>
            </NavButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link href='/settings'>
              <NavButton as='span'>
                <Settings className='text-black' />
                <span className='sr-only'>Settings page Link</span>
              </NavButton>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <NavButton className='h-[44px] w-[44px] p-0'>
              <UserButton
                afterSignOutUrl='/'
                appearance={{
                  elements: {
                    userButtonPopoverCard: 'border-2 border-black',
                  },
                }}
              />
            </NavButton>
          </motion.div>
        </div>
      )}
      <div className='w-[0.75rem] sm:w-[1.75rem]' />
    </div>
  );
}
