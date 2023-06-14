import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { CornerUpRight, Heart, type Icon } from 'react-feather';
import { motion } from 'framer-motion';

export default function Card({ imageUrl, content, callback }: { imageUrl: string; content: string; callback: () => void; }) {
  const [rotateDeg, setRotateDeg] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div ref={cardRef}>
      <motion.div
        drag
        dragConstraints={cardRef}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: rotateDeg }}
        onDrag={(_, info) => {
          if (info.offset.x > 100) {
            setRotateDeg(10);
          } else if (info.offset.x < -100) {
            setRotateDeg(-10);
          } else {
            setRotateDeg(0);
          }
        }}
        onDragEnd={(_, info) => {
          setRotateDeg(0);
          callback();
        }}
        className="flex flex-col items-center justify-evenly gap-6 p-4 bg-white text-black rounded-md"
      >
        <div className="flex flex-col items-center">
          <Image src={imageUrl} width={446} height={594} alt="" className="rounded-t-md pointer-events-none object-cover object-top w-[446px] h-[594px]" />
          <p className="text-current font-bold text-lg">{content}</p>
        </div>
        <div className="flex items-center justify-evenly gap-12">
          <ActionButton Icon={Heart} className="text-red-500" callback={callback} />
          <ActionButton Icon={CornerUpRight} className="text-blue-500" callback={callback} />
        </div>
      </motion.div>
    </motion.div>
  );
}



const ActionButton: React.FC<{ Icon: Icon; className: string; callback: () => void; }> = ({ Icon, className, callback }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.2, rotate: 10 }}
      whileTap={{
        scale: 0.8,
        rotate: -10,
        borderRadius: "100%"
      }}
      className={`p-4 bg-white text-3xl rounded-full shadow-lg border ${className} md:text-5xl relative`}
      onClick={callback}
    >
      <Icon className="w-[1em] h-[1em]" />
    </motion.button>
  );
};
