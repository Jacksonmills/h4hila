import { type NextPage } from 'next';
import { type RouterOutputs, api } from '~/utils/api';
import { useState } from 'react';
import Layout from '~/components/Layout';
import Card from '~/components/Card';
import LoadingSpinner from '~/components/LoadingSpinner';

export type PostWithUser = RouterOutputs['posts']['getAll'][number];

const Lighthouse: NextPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data } = api.posts.getAll.useQuery();

  if (!data) {
    return (
      <Layout>
        <LoadingSpinner size={100} />
      </Layout>
    );
  }

  const dataWithoutCurrentUser = data;

  const nextCard = () => {
    setCurrentIndex((prevIndex) => {
      return getRandomNextIndex(prevIndex);
    });
  };

  const getRandomNextIndex = (currentIndex: number) => {
    if (dataWithoutCurrentUser.length === 1) return currentIndex;

    let nextIndex;
    do {
      nextIndex = getRandomIndex();
    } while (nextIndex === currentIndex);
    return nextIndex;
  };

  const getRandomIndex = () =>
    Math.floor(Math.random() * dataWithoutCurrentUser.length);

  return (
    <div className='pt-2 md:flex md:flex-col md:items-center md:justify-center'>
      {dataWithoutCurrentUser && dataWithoutCurrentUser.length > 0 && (
        <div key={dataWithoutCurrentUser[currentIndex]?.post.id}>
          <Card
            data={dataWithoutCurrentUser[currentIndex] as PostWithUser}
            callback={nextCard}
          />
        </div>
      )}
    </div>
  );
};

export default Lighthouse;
