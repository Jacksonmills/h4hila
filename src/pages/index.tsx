import { type NextPage } from 'next';
import { type RouterOutputs, api } from '~/utils/api';
import { useState } from 'react';
import Card from '~/components/Card';
import LoadingSpinner from '~/components/LoadingSpinner';

export type PostWithUser = RouterOutputs['posts']['getAll'][number];

const Home: NextPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data } = api.posts.getAll.useQuery();

  if (!data) return <LoadingSpinner size={100} />;

  const nextCard = () => {
    if (currentIndex + 1 >= data.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className='pt-2 md:flex md:flex-col md:items-center md:justify-center'>
      {data && data.length > 0 && (
        <div key={data[currentIndex]?.post.id}>
          <Card data={data[currentIndex] as PostWithUser} callback={nextCard} />
        </div>
      )}
    </div>
  );
};

export default Home;
