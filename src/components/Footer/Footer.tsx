import Link from 'next/link';
import { BsFillBuildingsFill, BsTelephoneOutbound } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className='mt-16'>
      <div className='container mx-auto px-4'>
        <Link href='/' className='font-black text-primary text-2xl'>
        Ultimate premier inn hotel
        </Link>

        <h4 className='font-semibold text-[40px] py-6'>Contact</h4>

        <div className='flex flex-wrap gap-16 items-center justify-between'>
          <div className='flex-1'>

            <div className='flex items-center py-4'>
              <BsFillBuildingsFill />
              <p className='ml-2'>Dircksenstraße 117, 10178 Berlin</p>
            </div>
            <div className='flex items-center'>
              <BsTelephoneOutbound />
              <p className='ml-2'>000-000-00</p>
            </div>
            <div className='flex items-center pt-4'>
              <BiMessageDetail />
              <p className='ml-2'>hello@ultimatepremierinnhotel.com</p>
            </div>
          </div>

          <div className='flex-1 md:text-right'>
            <p className='pb-4'>Our Privacy Commitment</p>
            <p className='pb-4'>Terms of service</p>
            <p>Careers</p>
          </div>

          <div className='flex-1 md:text-right'>
            <p className='pb-4'>Experience</p>
            <p className='pb-4'>Navigate</p>
            <p>Events</p>
          </div>
        </div>
      </div>

      <div id="contact-footer" className='bg-black h-10 md:h-[10px] mt-16 w-full bottom-0 left-0' />
    </footer>
  );
};

export default Footer;
