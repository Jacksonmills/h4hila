import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FastForward, Heart, type Icon, Star, Volume2 } from 'react-feather';
import { motion } from 'framer-motion';

import { type PostWithUser } from '~/pages';
import useSound from 'use-sound';
import { colorContrast } from '~/utils/colorContrast';
import { getRandomBrandColor } from '~/utils/getRandomBrandColor';
import { useSoundEnabledContext } from '~/context/SoundEnabledContext';
import { soundbites } from '~/utils/soundbites';

interface CardProps {
  data: PostWithUser;
  callback?: () => void;
}

export default function Card({ data, callback }: CardProps) {
  const { soundEnabled } = useSoundEnabledContext();
  const [rotateDeg, setRotateDeg] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [randomBrandColor, setRandomBrandColor] = useState('');
  const [nextAudioFile, setNextAudioFile] = useState(
    Math.floor(Math.random() * soundbites.length)
  );

  const cardRef = useRef<HTMLDivElement>(null);

  const [play] = useSound(soundbites[nextAudioFile] as string, {
    volume: 0.25,
    soundEnabled,
  });

  const getNextAudioFile = (curr: number) => {
    const randomIndex = Math.floor(Math.random() * soundbites.length);
    if (randomIndex === curr) {
      return (curr + 1) % soundbites.length;
    }
    return randomIndex;
  };

  const handlePlayAudio = () => {
    play();
    setNextAudioFile((curr) => getNextAudioFile(curr));
  };

  const getAvailableUsername = () => {
    const username =
      (data?.post?.username as string) ||
      (data?.author?.username as string) ||
      'Fupa Trooper';
    return username;
  };

  useEffect(() => {
    setRandomBrandColor(getRandomBrandColor);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className='transition-opacity duration-100 md:h-auto'
    >
      <motion.div
        drag
        dragConstraints={cardRef}
        dragElastic={0.5}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
        whileHover={{ scale: 1.025 }}
        animate={{ rotate: rotateDeg, opacity: opacity }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onDrag={(_, info) => {
          // opacity
          if (info.offset.x > 20) {
            setOpacity(0.75);
          } else if (info.offset.x < -20) {
            setOpacity(0.75);
          } else {
            setOpacity(1);
          }

          // rotate
          if (info.offset.x > 20) {
            setRotateDeg(6);
            if (info.offset.x > 40) {
              setRotateDeg(12);
            }
            if (info.offset.x > 80) {
              setRotateDeg(24);
            }
          } else if (info.offset.x < -20) {
            setRotateDeg(-6);
            if (info.offset.x < -40) {
              setRotateDeg(-12);
            }
            if (info.offset.x < -80) {
              setRotateDeg(-24);
            }
          } else {
            setRotateDeg(0);
          }

          // basically this checks if the card is dragged off the screen
          if (
            info.offset.x > window.innerWidth / 2 ||
            info.offset.x < -window.innerWidth / 2
          ) {
            setOpacity(0.1);
          }
        }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 80) {
            callback && callback();
          }
          if (info.offset.x < -80) {
            callback && callback();
          }
          setRotateDeg(0);
          setOpacity(1);
        }}
        className='flex h-[90%] cursor-grab flex-col items-center justify-start gap-4 rounded-2xl border-2 border-black bg-white  p-2 text-black shadow-lg active:cursor-grabbing md:p-4'
      >
        <div className='relative flex shrink flex-col items-center'>
          <Image
            src={data?.author?.profileImageUrl as string}
            width={446}
            height={446}
            priority
            alt=''
            className='pointer-events-none h-[284px] w-[452px] rounded-t-xl border-2 border-b-0 border-black object-cover object-center sm:h-[332px] md:h-[448px]'
            style={{ backgroundColor: randomBrandColor }}
          />
          <code
            className='absolute right-0 top-0 ml-auto rounded-bl-3xl rounded-tl-3xl rounded-tr-2xl border-2 border-black px-4 py-1 font-bold'
            style={{
              backgroundColor: randomBrandColor,
              color: colorContrast(randomBrandColor),
            }}
          >
            #HOE4HILA
          </code>
          <div className='relative flex w-full flex-col gap-2 rounded-b-2xl border-2 border-black bg-h3Purple/20 px-4 py-2 md:px-6 md:py-4'>
            <p className='text-xl font-bold text-current md:text-2xl'>
              {getAvailableUsername()}
            </p>
            <p className='text-md min-h-[115px] max-w-[400px] break-words text-current md:text-lg'>
              {data?.post.content}
            </p>
          </div>
        </div>
        <div className='m-auto flex grow items-center justify-evenly gap-4 py-4'>
          <ActionButton
            Icon={Heart}
            className='bg-h3Pink'
            callback={callback}
            label='Like and go to next profile card'
          />
          <ActionButton
            Icon={soundEnabled ? Volume2 : Star}
            className='bg-h3Purple p-6 text-4xl sm:p-8 sm:text-5xl md:text-6xl'
            callback={soundEnabled ? handlePlayAudio : callback}
            soundEnabled={soundEnabled}
            label={
              soundEnabled
                ? 'Play H3podcast soundbite'
                : 'Super-like and go to next profile card'
            }
          />
          <ActionButton
            Icon={FastForward}
            className='bg-h3Blue'
            callback={callback}
            label='go to next profile card'
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

const ActionButton: React.FC<{
  label: string;
  Icon: Icon;
  className?: string;
  soundEnabled?: boolean;
  callback?: () => void;
}> = ({ label, Icon, className, soundEnabled, callback }) => {
  const [rotateDeg, setRotateDeg] = useState(0);

  function getRandomRotation() {
    return Math.floor(Math.random() * 30) + 10;
  }

  useEffect(() => {
    setRotateDeg(getRandomRotation());
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.2, rotate: -rotateDeg }}
      whileTap={{
        scale: 0.8,
        rotate: rotateDeg,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative rounded-full border-2 border-black p-4 text-2xl text-white sm:text-3xl md:text-5xl ${
        className || ''
      }`}
      onPointerUp={callback}
    >
      <Icon
        className={`h-[1em] w-[1em] ${
          !soundEnabled ? 'fill-white' : 'volume-icon'
        }`}
      />
      <span className='sr-only'>{label}</span>
    </motion.button>
  );
};
