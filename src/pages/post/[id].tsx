import { type GetStaticProps, type NextPage } from 'next';
import React from 'react';
import { api } from '~/utils/api';
import { generateSSGHelpers } from '~/server/helpers/ssgHelpers';

const PostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({
    id,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <h1>{data?.post.content}</h1>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelpers();

  const id = context.params?.id;

  if (typeof id !== 'string') throw new Error('id is not a string');

  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default PostPage;
