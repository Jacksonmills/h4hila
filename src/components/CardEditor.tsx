import { UserProfile } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ArrowDown, Save } from 'react-feather';

import { type PostWithUser } from '~/pages';

interface CardEditorProps { data: PostWithUser; }

export default function CardEditor({ data }: CardEditorProps) {
  const [inputValue, setInputValue] = useState(data.post?.content);
  const [imageUrl, setImageUrl] = useState(data.author?.profileImageUrl);

  useEffect(() => {
    setImageUrl(data.author?.profileImageUrl as string);
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-start gap-4 bg-white text-black rounded-md h-screen">
      <div className="flex flex-col md:flex-row w=[55rem]">
        <div className='relative'>
          <Image src={imageUrl as string} width={446} height={446} alt="" className="rounded-t-md md:rounded-l-md md:rounded-tr-none pointer-events-none object-cover object-top h-[332px] md:h-[446px] w-[446px]" />
        </div>
        <div className="flex flex-col gap-2 grow w-full bg-h3Purple/20 px-6 py-4 rounded-b-md md:rounded-r-md md:rounded-bl-none relative">
          <p className="text-current font-bold text-2xl md:text-2xl">{data.author?.username}</p>
          <form onSubmit={(e) => console.log('yo', e)} className='flex flex-col gap-4'>
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
        h</div>
    </div>
  );
}
