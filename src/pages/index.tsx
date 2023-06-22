import { type NextPage } from 'next';
import { type RouterOutputs, api } from '~/utils/api';
import LoadingSpinner from '~/components/LoadingSpinner';
import Deck from '~/components/Deck';
import { useEffect, useState } from 'react';

export type AllPostData = RouterOutputs['posts']['getAll'];
export type PostWithUser = AllPostData[number] | undefined;

const Home: NextPage = () => {
  const [data, setData] = useState<PostWithUser[]>([]);
  const query = api.posts.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const fetchPosts = () => {
      setData(query.data || []);
    };

    fetchPosts();

    return () => {
      setData([]);
    };
  }, [query.data]);

  if (data.length === 0) return <LoadingSpinner size={100} />;

  return (
    <div className='md:flex md:flex-col md:items-center md:justify-center'>
      <Deck posts={data} />
    </div>
  );
};

export default Home;
