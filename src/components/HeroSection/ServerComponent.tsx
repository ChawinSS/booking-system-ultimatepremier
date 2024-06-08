import Image from 'next/image';
import React from 'react';

export const heading1 = (
  <>
    <h1 className='font-heading mb-6'>Discover the Exquisite in Berlin</h1>
    <p className='text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg'>
      Discover the vibrant heart of Europe at our exquisite hotel in Berlin. Known for its rich history, eclectic culture, and dynamic arts scene.
    </p>
    <button className='btn-primary'>More about Berlin</button>
  </>
);

export const section2 = (
  <div className='md:grid hidden gap-4 grid-cols-1'>
    <div className='rounded-2xl overflow-hidden h-60'>
      <Image
        src='/images/hero-1.jpeg'
        alt='hero-1'
        width={200}
        height={200}
        className='img scale-animation'
      />
    </div>

    <div className='grid grid-cols-2 gap-4 h-30'>
      <div className='rounded-2xl overflow-hidden'>
        <Image
          src='/images/hero-2.jpeg'
          alt='hero-2'
          width={200}
          height={200}
          className='img scale-animation'
        />
      </div>
      <div className='rounded-2xl overflow-hidden'>
        <Image
          src='/images/hero-3.jpeg'
          alt='hero-3'
          width={200}
          height={200}
          className='img scale-animation'
        />
      </div>
    </div>
  </div>
);
