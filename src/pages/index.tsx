import { type NextPage } from 'next';
import { type RouterOutputs, api } from '~/utils/api';
import { useCallback, useEffect, useState } from 'react';
import Card from '~/components/Card';
import LoadingSpinner from '~/components/LoadingSpinner';

export type AllPostData = RouterOutputs['posts']['getAll'];
export type PostWithUser = AllPostData[number] | undefined;

const Home: NextPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledPosts, setShuffledPosts] = useState<PostWithUser[]>([]);
  const { data = [] } = api.posts.getAll.useQuery();

  const shuffle = (array: PostWithUser[]) => {
    let currentIndex = array.length;
    let temporaryValue: PostWithUser | undefined;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    if (!data) return;

    setShuffledPosts(shuffle(data));

    return () => {
      setShuffledPosts([]);
    };
  }, [data]);

  const nextCard = useCallback(() => {
    if (!data) return;
    if (currentIndex + 1 >= data.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, data]);

  useEffect(() => {
    const keyboardListener = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        nextCard();
      }
    };

    window.addEventListener('keydown', keyboardListener);

    return () => {
      window.removeEventListener('keydown', keyboardListener);
    };
  }, [nextCard]);

  if (!shuffledPosts) return <LoadingSpinner size={100} />;

  return (
    <div className='md:flex md:flex-col md:items-center md:justify-center'>
      {shuffledPosts && shuffledPosts.length > 0 && (
        <div key={shuffledPosts[currentIndex]?.post.id}>
          <Card data={shuffledPosts[currentIndex]} callback={nextCard} />
        </div>
      )}
    </div>
  );
};

export default Home;
