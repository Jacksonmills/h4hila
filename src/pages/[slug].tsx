import { type GetStaticProps, type NextPage } from 'next';
import React from 'react';
import { api } from '~/utils/api';
import { prisma } from '~/server/db';

import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { appRouter } from '~/server/api/root';

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <h1>{data?.username}</h1>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== 'string') throw new Error('slug is not a string');

  await helpers.profile.getUserByUsername.prefetch({ username: slug });

  return {
    props: {
      trpcState: helpers.dehydrate(),
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
