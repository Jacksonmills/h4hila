import { UserProfile, useClerk, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ArrowDown, LogOut, Save, XCircle } from 'react-feather';

import { type PostWithUser } from '~/pages';
import { api } from '~/utils/api';

interface SettingsPanelProps { data?: PostWithUser; }

export default function SettingsPanel({ data }: SettingsPanelProps) {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  const [username, setUsername] = useState(getAvailableUsername());
  const [bio, setBio] = useState(data?.post?.content || '');
  const [imageUrl, setImageUrl] = useState(user?.profileImageUrl || '');
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let nextUsername = username;

    if (username === '') {
      nextUsername = "Fupa Trooper";
    }

    if (data?.post.id) {
      updatePost({
        username: nextUsername,
        content: bio
      });

      return void router.push('/');
    }

    mutate({
      username: nextUsername,
      content: bio
    });

    return void router.push('/');
  };

  const handleSignOut = () => {
    void signOut();
  };

  function getAvailableUsername() {
    const username = data?.post?.username as string || data?.author?.username as string || "Fupa Trooper";
    return username;
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className="flex flex-col md:flex-row mx-[0.75rem] sm:mx-[1.75rem] bg-white rounded-2xl">
        <div className='relative'>
          <div className="absolute flex gap-4 justify-between w-full p-2">
            <button
              className="bg-h3Pink text-white font-bold px-4 py-2 rounded-full shadow-sm flex gap-2 items-center hover:bg-h3HotPink transition-colors duration-200 ease-in-out"
              onClick={handleSignOut}
            >
              Sign Out <LogOut className='w-[1.6em] h-[1.6em]' />
            </button>
          </div>
          {imageUrl && <Image src={imageUrl} width={446} height={446} alt="" className="rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none pointer-events-none object-cover object-center w-full h-full" />}
        </div>
        <div className="flex flex-col gap-2 grow w-full bg-h3Purple/20 px-6 py-4 rounded-b-md md:rounded-r-md md:rounded-bl-none relative">
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="name" className="font-bold">Username</label>
              <input
                type="text"
                className="bg-white rounded-md shadow-md p-2"
                placeholder="Pick a display name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="bio" className="font-bold">Bio</label>
              <textarea
                id="bio"
                className="bg-white rounded-md shadow-md p-2 resize-none h-[100px] md:h-[200px]"
                placeholder="Write a bio..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-400">140 characters max</p>
              <p className="text-sm text-gray-400 aria-disabled:text-red-500" aria-disabled={disabled}>{bio.length}/140</p>
            </div>
            <button
              type="submit"
              disabled={disabled}
              className='bg-h3Purple text-white font-bold text-xl inline-flex items-center justify-center p-2 rounded-md disabled:bg-gray-400 hover:bg-h3DarkPurple transition-colors duration-200 ease-in-out'
            >
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
            </button>
          </form>
        </div>
      </div>
      <h2 className='text-2xl font-bold flex flex-col items-center justify-center'>
        Change profile image below <ArrowDown />
      </h2>
      <UserProfile />
    </div>
  );
}
