import { UserProfile, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React, { type Dispatch, useEffect, useState, type SetStateAction } from 'react';
import { ArrowDown, Save } from 'react-feather';
import { set } from 'zod';

import { type PostWithUser } from '~/pages';
import { api } from '~/utils/api';

interface CardEditorProps { data?: PostWithUser; toggleModal: Dispatch<SetStateAction<boolean>>; }

export default function CardEditor({ data, toggleModal }: CardEditorProps) {
  const { user } = useUser();
  const [inputValue, setInputValue] = useState(data?.post?.content || '');
  const [imageUrl, setImageUrl] = useState(user?.profileImageUrl);

  const ctx = api.useContext();

  const { mutate } = api.posts.create.useMutation({
    onSuccess: () => {
      setInputValue('');
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
    if (data?.post.id) {
      updatePost({ content: inputValue });
      toggleModal(false);
      return;
    }
    mutate({ content: inputValue });
    toggleModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-start gap-4 bg-white text-black rounded-md h-screen">
      <div className="flex flex-col md:flex-row w=[55rem]">
        <div className='relative'>
          {imageUrl && <Image src={imageUrl} width={446} height={446} alt="" className="rounded-t-md md:rounded-l-md md:rounded-tr-none pointer-events-none object-cover object-top h-[332px] md:h-[446px] w-[446px]" />}
        </div>
        <div className="flex flex-col gap-2 grow w-full bg-h3Purple/20 px-6 py-4 rounded-b-md md:rounded-r-md md:rounded-bl-none relative">
          <p className="text-current font-bold text-2xl md:text-2xl">{user?.username ? user?.username : 'H3H3 Enjoyer'}</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <textarea
              className="bg-white rounded-md shadow-md p-2"
              placeholder="Write something about yourself..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className='bg-h3Purple text-white font-bold text-xl inline-flex items-center justify-center p-2 rounded-md'>
              <Save /><span className='sr-only'>Save</span>
            </button>
          </form>
        </div>
      </div>
      <h2 className='text-2xl flex flex-col items-center justify-center'>Change profile image below <ArrowDown /></h2>
      <div className=''>
        <UserProfile />
      </div>
    </div>
  );
}
