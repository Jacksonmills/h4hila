import React, { use, useCallback, useEffect, useState } from 'react';
import { type PostWithUser } from '~/pages';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';

export default function Deck({ posts }: { posts: PostWithUser[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledPosts, setShuffledPosts] = useState<PostWithUser[]>(
    shuffle(posts)
  );
  const [isShuffling, setIsShuffling] = useState(true);

  function shuffle(array: PostWithUser[]) {
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
  }

  const nextCard = useCallback(() => {
    if (posts.length === 0) return;

    if (currentIndex + 1 >= posts.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, posts]);

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

  useEffect(() => {
    setIsShuffling(true);
    setShuffledPosts(shuffle(posts));
    setIsShuffling(false);
  }, [posts]);

  if (isShuffling) return <LoadingSpinner size={69} />;

  return (
    <>
      {shuffledPosts && shuffledPosts.length > 0 && (
        <div key={shuffledPosts[currentIndex]?.post.id}>
          <Card data={shuffledPosts[currentIndex]} callback={nextCard} />
        </div>
      )}
    </>
  );
}
