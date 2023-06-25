import { type GetStaticProps, type NextPage } from 'next';
import React from 'react';
import { api } from '~/utils/api';

import { useUser } from '@clerk/nextjs';
import { generateSSGHelpers } from '~/server/helpers/ssgHelpers';

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { user } = useUser();
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  const { data: posts } = api.posts.getPostsByUserId.useQuery({
    userId: user?.id as string,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <h1>{data?.username}</h1>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelpers();

  const slug = context.params?.slug;

  if (typeof slug !== 'string') throw new Error('slug is not a string');

  await ssg.profile.getUserByUsername.prefetch({ username: slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default ProfilePage;
