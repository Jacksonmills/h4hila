import { UserProfile, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ArrowDown, Save, XCircle } from 'react-feather';

import { api } from '~/utils/api';
import { getRandomBrandColor } from '~/utils/getRandomBrandColor';
import SaveButton from './SaveButton';
import validateText from '~/utils/validateText';
import { type OnePostWithUser } from '~/pages/settings';

interface SettingsPanelProps {
  data?: OnePostWithUser;
}

export default function SettingsPanel({ data }: SettingsPanelProps) {
  const router = useRouter();
  const { user } = useUser();
  const [username, setUsername] = useState(getAvailableUsername());
  const [bio, setBio] = useState(data?.post?.content || '');
  const [imageUrl, setImageUrl] = useState(user?.profileImageUrl || '');
  const [randomBackgroundColor, setRandomBackgroundColor] = useState('#ff0000');
  const [usernameError, setUsernameError] = useState('');
  const [bioError, setBioError] = useState('');

  const disabled = bio.length > 140;

  const ctx = api.useContext();

  const { mutate } = api.posts.create.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
    },
  });

  const { mutate: updatePost } = api.posts.update.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
    },
  });

  useEffect(() => {
    setImageUrl(user?.profileImageUrl as string);
  }, [user?.profileImageUrl]);

  useEffect(() => {
    setRandomBackgroundColor(getRandomBrandColor);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let nextUsername = username;

    if (username === '') {
      nextUsername = 'Fupa Trooper';
    }

    const isValid = validateText(nextUsername) && validateText(bio);

    if (!isValid) {
      const usernameInvalid = !validateText(nextUsername);
      const bioInvalid = !validateText(bio);
      usernameInvalid && setUsernameError('Error: Contains bad words');
      bioInvalid && setBioError('Error: Contains bad words');
      return;
    }

    if (data?.post?.id) {
      updatePost({
        username: nextUsername,
        content: bio,
      });

      return void router.push('/');
    }

    mutate({
      username: nextUsername,
      content: bio,
    });

    return void router.push('/');
  };

  function getAvailableUsername() {
    const username =
      (data?.post?.username as string) ||
      (data?.author?.username as string) ||
      'Fupa Trooper';
    return username;
  }

  return (
    <div className='flex flex-col gap-2 md:gap-6'>
      <div className='flex flex-col rounded-2xl border-2 border-black bg-white md:flex-row'>
        <div>
          <Image
            src={imageUrl}
            width={446}
            height={446}
            alt={`${username}'s Profile Image`}
            className='pointer-events-none h-[284px] w-full rounded-t-2xl object-cover object-center sm:h-[332px] md:h-[448px] md:rounded-l-2xl md:rounded-tr-none'
            style={{ backgroundColor: randomBackgroundColor }}
          />
        </div>
        <div className='relative flex w-full grow flex-col gap-2 rounded-b-2xl border-l-0 border-t-2 border-black bg-h3Purple/20 p-2 md:rounded-r-2xl md:rounded-bl-none md:border-l-2 md:border-t-0 md:p-4'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='name' className='flex gap-2 font-bold'>
                Username
                {usernameError && (
                  <p className='text-red-500' role='alert'>
                    {usernameError}
                  </p>
                )}
              </label>
              <input
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
                {bioError && (
                  <p className=' text-red-500' role='alert'>
                    {bioError}
                  </p>
                )}
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
                <>
                  <Save />
                  <span className='sr-only'>Save</span>
                </>
              )}
            </SaveButton>
          </form>
        </div>
      </div>
      <h2 className='flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-white p-4 text-xl font-bold md:text-2xl'>
        <ArrowDown className='h-auto w-[1.6em]' /> Change Profile Image
      </h2>
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
  );
}
