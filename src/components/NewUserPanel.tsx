import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { api } from '~/utils/api';
import { getRandomBrandColor } from '~/utils/getRandomBrandColor';
import { toast } from 'react-hot-toast';
import ProfileFormCard from './ProfileFormCard';

export default function NewUserPanel() {
  const router = useRouter();
  const { user } = useUser();
  const [username, setUsername] = useState('Fupa Trooper');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState(user?.profileImageUrl as string);
  const [randomBackgroundColor, setRandomBackgroundColor] = useState('#ff0000');
  const [modalOpen, setModalOpen] = useState(false);

  const disabled = bio.length > 140;

  const ctx = api.useContext();

  const { mutate: createPost, isLoading: isPosting } =
    api.posts.create.useMutation({
      onSuccess: async () => {
        void ctx.posts.getAll.invalidate();
        void ctx.posts.getOneByAuthorId.invalidate();

        await router.push('/');
      },
      onError: (error) => {
        const errors = error.data?.zodError?.formErrors;
        if (errors && errors[0]) {
          toast.error(errors[0]);
        } else {
          toast.error('Please try again later! 💅');
        }
      },
    });

  useEffect(() => {
    setImageUrl(user?.profileImageUrl as string);
  }, [user?.profileImageUrl]);

  useEffect(() => {
    setRandomBackgroundColor(getRandomBrandColor);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let nextUsername = username;

    if (username === '') {
      nextUsername = 'Fupa Trooper';
    }

    createPost({
      username: nextUsername,
      content: bio,
    });
  };

  return (
    <ProfileFormCard
      username={username}
      bio={bio}
      imageUrl={imageUrl}
      randomBackgroundColor={randomBackgroundColor}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      disabled={disabled}
      handleSubmit={handleSubmit}
      setUsername={setUsername}
      setBio={setBio}
      isPosting={isPosting}
    />
  );
}
