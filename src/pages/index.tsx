import { type NextPage } from 'next';
import { type RouterOutputs, api } from '~/utils/api';
import LoadingSpinner from '~/components/LoadingSpinner';
import Deck from '~/components/Deck';

export type AllPostData = RouterOutputs['posts']['getAll'];
export type PostWithUser = AllPostData[number] | undefined;

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (!data || isLoading) return <LoadingSpinner size={69} />;

  return (
    <div className='md:flex md:flex-col md:items-center md:justify-center'>
      <h1 className='sr-only'>Hoe4hila Home page</h1>
      <Deck posts={data} />
    </div>
  );
};

export default Home;
