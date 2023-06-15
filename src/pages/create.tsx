import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';
import Layout from '~/components/Layout';
import { api } from '~/utils/api';

export default function CreatePage() {
  const { user } = useUser();
  const { data } = api.posts.getAll.useQuery();

  console.log(user);

  if (!user) return null;

  return (
    <Layout>
      <div className='flex gap-2 bg-gray-600 rounded-full p-2 w-full'>
        <Image className='rounded-full' src={user.profileImageUrl} width={60} height={60} alt="Profile image" />
        <input className='rounded-full px-4 grow' type="text" placeholder="What's on your mind?" />
      </div>
    </Layout>
  );
}
