'use client';

import { FC } from 'react';

import CountUpNumber from '../CountUpNumber/CountUpNumber';

type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};

const ClientComponent: FC<Props> = props => {
  const { heading1, section2 } = props;

  return (
    <section className='flex px-4 items-center gap-6 container mx-auto'>
      <div className='py-10 h-full'>
        {heading1}

        <div className='flex justify-between mt-12'>
          <div className='flex gap-1 flex-col items-center justify-center'>
            <p className='text-xs lg:text-xl text-center'>Standard Room</p>
            <CountUpNumber duration={8000} endValue={25} />
          </div>
          <div className='flex gap-1 flex-col items-center justify-center'>
            <p className='text-xs lg:text-xl text-center'>Family Room</p>
            <CountUpNumber duration={8000} endValue={10} />
          </div>
          <div className='flex gap-1 flex-col items-center justify-center'>
            <p className='text-xs lg:text-xl text-center'>Disable Room</p>
            <CountUpNumber duration={8000} endValue={5} />
          </div>
        </div>
      </div>

      {section2}
    </section>
  );
};

export default ClientComponent;
