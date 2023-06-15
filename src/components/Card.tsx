import Image from 'next/image';
import React, { use, useEffect, useRef, useState } from 'react';
import { CornerUpRight, FastForward, Heart, type Icon } from 'react-feather';
import { motion } from 'framer-motion';
import { get } from 'http';
import { type PostWithUser } from '~/pages';

interface CardProps extends PostWithUser { imageUrl: string; content: string; callback: () => void; }

export default function Card({ author, imageUrl, content, callback }: CardProps) {
  const [rotateDeg, setRotateDeg] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div ref={cardRef}>
      <motion.div
        drag
        dragConstraints={cardRef}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 40 }}
        whileHover={{ scale: 1.05 }}
        animate={{ rotate: rotateDeg }}
        onDrag={(_, info) => {
          if (info.offset.x > 10) {
            setRotateDeg(4);
          } else if (info.offset.x < -10) {
            setRotateDeg(-4);
          } else {
            setRotateDeg(0);
          }
        }}
        onDragEnd={(_, info) => {
          setRotateDeg(0);
          callback();
        }}
        className="flex flex-col items-center justify-evenly gap-4 p-4 bg-white text-black rounded-md shadow-lg"
      >
        <div className="flex flex-col items-center">
          <Image src={imageUrl} width={446} height={594} alt="" className="rounded-t-md pointer-events-none object-cover object-top w-[90vw] h-[calc(594px/1.2)] md:w-[446px] md:h-[594px]" />
          <div className='flex w-full bg-slate-300 px-2 py-4 rounded-b-md'>
            <div className='flex gap-2 items-center mr-auto'>
              <Image src={author?.profileImageUrl as string} width={60} height={60} alt="Profile image" className="rounded-full w-[1.6em] h-[1.6em]" />
              <p className="text-current font-bold text-lg">{author?.username}</p>
            </div>
            <p className="text-current font-bold text-lg">{content}</p>
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-12">
          <ActionButton Icon={Heart} className="bg-primary" callback={callback} />
          <ActionButton Icon={FastForward} className="bg-secondary" callback={callback} />
        </div>
      </motion.div>
    </motion.div>
  );
}



const ActionButton: React.FC<{
  Icon: Icon;
  className: string;
  callback: () => void;
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
        className={`p-4 text-white text-3xl rounded-full shadow-lg ${className} md:text-5xl relative`}
        onClick={callback}
      >
        <Icon className={`w-[1em] h-[1em] fill-white`} />
      </motion.button>
    );
  };
