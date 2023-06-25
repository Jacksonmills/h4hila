import Image from 'next/image';
import React from 'react';

export default function Background() {
  return (
    <div className='absolute left-0 top-0 z-[-1] h-full w-screen bg-h3Pink'>
      <Image
        src='/image/bg.svg'
        width={3840}
        height={2160}
        alt='Swooping color blobs in the background'
        priority
      />
    </div>
  );
}
