import React from 'react';
import Modal from './Modal';
import { UserProfile } from '@clerk/nextjs';
import SaveButton from './SaveButton';
import { Send, XCircle, Image as ImageIcon } from 'react-feather';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  randomBackgroundColor: string;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPosting: boolean;
  disabled: boolean;
  isNewUser?: boolean;
}

export default function ProfileFormCard({
  username,
  setUsername,
  bio,
  setBio,
  imageUrl,
  randomBackgroundColor,
  modalOpen,
  setModalOpen,
  handleSubmit,
  isPosting,
  disabled,
  isNewUser = false,
}: Props) {
  const getSaveButtonText = () => {
    if (isNewUser) {
      return isPosting ? 'Creating Profile...' : 'Create Profile';
    }

    return isPosting ? 'Updating Profile...' : 'Update Profile';
  };

  return (
    <div className='grid w-full place-content-center md:h-[90vh]'>
      <div className='flex w-[94vw] max-w-[800px] flex-col gap-2 md:gap-6'>
        <div className='flex flex-col rounded-2xl bg-white md:flex-row'>
          <div className='relative'>
            <div className='absolute bottom-2 right-2 md:bottom-4 md:right-4'>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => setModalOpen(!modalOpen)}
                className='relative h-[50px] w-[50px] rounded-full border-2 border-black bg-h3Blue p-1 text-white'
              >
                <span className='pointer-events-none absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-current'>
                  <ImageIcon />
                </span>
                <span className='sr-only'>
                  Change profile image, opens dialog
                </span>
              </motion.button>
            </div>
            <Image
              src={imageUrl}
              width={446}
              height={446}
              alt={`${username}'s Profile Image`}
              className='pointer-events-none h-[364px] w-full min-w-full rounded-t-2xl border-2 border-black object-cover object-center md:h-full md:min-w-[332px] md:rounded-l-2xl md:rounded-tr-none'
              style={{ backgroundColor: randomBackgroundColor }}
            />
          </div>
          <div className='relative flex w-full grow flex-col gap-2 rounded-b-2xl border-2 border-t-0 border-black bg-h3Purple/20 p-2 md:rounded-r-2xl md:rounded-bl-none md:border-l-0 md:border-t-2 md:p-4'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <label htmlFor='username' className='flex gap-2 font-bold'>
                  Username
                </label>
                <input
                  id='username'
                  type='text'
                  className='rounded-xl border-2 border-black bg-white p-2 shadow-md'
                  placeholder='Pick a display name'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor='bio' className='flex gap-2 font-bold'>
                  Bio
                </label>
                <textarea
                  id='bio'
                  className='h-[100px] resize-none rounded-xl border-2 border-black bg-white p-2 shadow-md md:h-[200px]'
                  placeholder='Write a bio...'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className='flex justify-between'>
                <p className='text-sm text-gray-400'>140 characters max</p>
                <p
                  className='text-sm text-gray-400 aria-disabled:text-red-500'
                  aria-disabled={disabled}
                >
                  {bio.length}/140
                </p>
              </div>
              <SaveButton type='submit' disabled={disabled}>
                {disabled ? (
                  <>
                    <XCircle />
                    <span className='sr-only'>Too long!</span>
                  </>
                ) : (
                  <div className='flex items-center gap-4'>
                    <Send />
                    {getSaveButtonText()}
                  </div>
                )}
              </SaveButton>
            </form>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          title='Change profile image'
          handleDismiss={() => setModalOpen(false)}
        >
          <div className='w-[94vw] md:w-auto'>
            <UserProfile
              appearance={{
                layout: {
                  logoPlacement: 'inside',
                },
                elements: {
                  header: 'hidden',
                  navbar: 'hidden',
                  navbarMobileMenuRow: 'hidden',
                  profileSectionTitle: 'hidden',
                  profileSection__connectedAccounts: 'hidden',
                  profileSection__password: 'hidden',
                  profileSection__activeDevices: 'hidden',
                  profilePage__security: 'hidden',
                  pageScrollBox:
                    'p-2 md:min-h-[220px] flex gap-2 items-start justify-center',
                  page: 'w-full',
                  rootBox: 'm-0 w-full flex items-center justify-center',
                  card: 'rounded-2xl m-0 bg-white border-2 border-black',
                },
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
