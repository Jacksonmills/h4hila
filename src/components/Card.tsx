import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FastForward, Heart, Zap, type Icon } from 'react-feather';
import { motion } from 'framer-motion';

import { type PostWithUser } from '~/pages';
import useSound from 'use-sound';
import { colorContrast } from '~/utils/colorContrast';
import { getRandomBrandColor } from '~/utils/getRandomBrandColor';

interface CardProps { data: PostWithUser; callback?: () => void; }

export default function Card({ data, callback }: CardProps) {
  const [rotateDeg, setRotateDeg] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [randomBrandColor, setRandomBrandColor] = useState('');
  const [randomAudioFile, setRandomAudioFile] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  const audioUrls = [
    'https://cdn.glitch.me/3b576859-bca3-4031-ae39-117a4ffdc779%2Fvin%20beautiful.mp3',
    'https://cdn.glitch.com/3b576859-bca3-4031-ae39-117a4ffdc779%2Fvin_diesel_wow_man.mp3?v=1620189329726',
    'https://cdn.glitch.com/3b576859-bca3-4031-ae39-117a4ffdc779%2Fvin%20talk.mp3?v=1620459443481'
  ];

  const [play] = useSound(
    audioUrls[randomAudioFile] as string,
    {
      volume: 0.5,
    }
  );

  const handlePlayAudio = () => {
    play();
    setRandomAudioFile(Math.floor(Math.random() * audioUrls.length));
  };

  const getAvailableUsername = () => {
    const username = data?.post?.username as string || data?.author?.username as string || "Fupa Trooper";
    return username;
  };

  useEffect(() => {
    setRandomBrandColor(getRandomBrandColor);
  }, []);

  return (
    <motion.div ref={cardRef} className='transition-opacity duration-100 md:h-auto'>
      <motion.div
        drag
        dragConstraints={cardRef}
        dragElastic={0.5}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
        whileHover={{ scale: 1.025 }}
        animate={{ rotate: rotateDeg, opacity: opacity }}
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
          if (info.offset.x > 10) {
            setRotateDeg(6);
            if (info.offset.x > 20) {
              setRotateDeg(12);
            }
            if (info.offset.x > 40) {
              setRotateDeg(24);
            }
          } else if (info.offset.x < -10) {
            setRotateDeg(-6);
            if (info.offset.x < -20) {
              setRotateDeg(-12);
            }
            if (info.offset.x < -40) {
              setRotateDeg(-24);
            }
          } else {
            setRotateDeg(0);
          }

          // basically this checks if the card is dragged off the screen
          if (info.offset.x > window.innerWidth / 2 || info.offset.x < -window.innerWidth / 2) {
            setOpacity(0.1);
          }
        }}
        onDragEnd={() => {
          setRotateDeg(0);
          callback && callback();
        }}
        className="flex flex-col items-center justify-start gap-4 p-2 md:p-4 rounded-2xl h-[90%] bg-white text-black  shadow-lg cursor-grab active:cursor-grabbing"
      >
        <div className="flex flex-col items-center shrink relative">
          <Image src={data.author?.profileImageUrl as string} width={446} height={446} alt="" className="rounded-t-xl pointer-events-none object-cover object-center h-[296px] md:h-[446px] w-[446px]" />
          <code
            className="font-bold rounded-bl-2xl rounded-tl-2xl rounded-tr-xl px-4 py-1 ml-auto absolute top-0 right-0"
            style={{
              backgroundColor: randomBrandColor,
              color: colorContrast(randomBrandColor),
            }}
          >
            #HOE4HILA
          </code>
          <div className="flex flex-col gap-2 w-full bg-h3Purple/20 px-4 md:px-6 py-2 md:py-4 rounded-b-xl relative">
            <p className="text-current font-bold text-xl md:text-2xl">{getAvailableUsername()}</p>
            <p className="text-current text-md md:text-lg max-w-[400px] min-h-[115px] break-words">{data.post.content}</p>
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-4 grow m-auto py-4">
          <ActionButton Icon={Heart} className="bg-h3Pink" callback={callback} />
          <ActionButton Icon={Zap} className="bg-h3Purple p-6 sm:p-8 shadow-md text-4xl md:text-6xl" callback={handlePlayAudio} />
          <ActionButton Icon={FastForward} className="bg-h3Blue" callback={callback} />
        </div>
      </motion.div>
    </motion.div >
  );
}

const ActionButton: React.FC<{
  Icon: Icon;
  className: string;
  callback?: () => void;
}> = ({
  Icon,
  className,
  callback,
}) => {
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
          borderRadius: "100%"
        }}
        className={`${className} p-4 text-white text-2xl rounded-full shadow-md shadow-black/30 sm:text-3xl md:text-5xl relative`}
        onPointerUp={callback}
      >
        <Icon className={`w-[1em] h-[1em] fill-white`} />
      </motion.button>
    );
  };
