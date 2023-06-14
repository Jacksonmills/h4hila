import Image from 'next/image';
import React, { use, useEffect, useRef, useState } from 'react';
import { CornerUpRight, Heart, type Icon } from 'react-feather';
import { motion } from 'framer-motion';
import { get } from 'http';

export default function Card({ imageUrl, content, callback }: { imageUrl: string; content: string; callback: () => void; }) {
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
        className="flex flex-col items-center justify-evenly gap-6 p-4 bg-white text-black rounded-md shadow-lg"
      >
        <div className="flex flex-col items-center">
          <Image src={imageUrl} width={446} height={594} alt="" className="rounded-t-md pointer-events-none object-cover object-top w-[90vw] h-[calc(594px/1.2)] md:w-[446px] md:h-[594px]" />
          <p className="text-current font-bold text-lg">{content}</p>
        </div>
        <div className="flex items-center justify-evenly gap-12">
          <ActionButton Icon={Heart} className="text-primary" callback={callback} />
          <ActionButton Icon={CornerUpRight} className="text-secondary" callback={callback} />
        </div>
      </motion.div>
    </motion.div>
  );
}



const ActionButton: React.FC<{ Icon: Icon; className: string; callback: () => void; }> = ({ Icon, className, callback }) => {
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
      className={`p-4 bg-white text-3xl rounded-full shadow-lg border ${className} md:text-5xl relative`}
      onClick={callback}
    >
      <Icon className="w-[1em] h-[1em]" />
    </motion.button>
  );
};
