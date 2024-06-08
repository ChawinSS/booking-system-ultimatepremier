'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FC } from 'react';

type Props = {
  roomTypeFilter: string;
  searchQuery: string;
  setRoomTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
};

const Search: FC<Props> = ({
  roomTypeFilter,
  searchQuery,
  setRoomTypeFilter,
  setSearchQuery,
}) => {
  const router = useRouter();

  const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(event.target.value);
  };

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
  };

  return (
    <section className='bg-white px-1 py-1 mt-4 rounded-lg'>
      <div className='container mx-auto flex gap-2 flex-wrap justify-between items-center'>
        <div className='w-full md:1/3 lg:w-auto mb-4 md:mb-0'>
          <label className='block text-sm font-medium mb-2 text-black'>
            Room type
          </label>
          <div className='relative'>
            <select
              value={roomTypeFilter}
              onChange={handleRoomTypeChange}
              className='w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none border border-gray-300 dark:border-gray-700'
            >
              <option value='All'>All</option>
              <option value='Standard Twin Room'>Standart Twin room</option>
              <option value='Standard Double Room'>Standart Double room</option>
              <option value='Family Room'>Family room</option>
              <option value='Disable Room'>Disable room</option>
            </select>
          </div>
        </div>

        <div className='w-full md:1/3 lg:w-auto mb-4 md:mb-0'>
          <label className='block text-sm font-medium mb-2 text-black'>
            Search
          </label>
          <input
            type='search'
            id='search'
            placeholder='search here'
            className='w-full px-4 py-3 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white border border-gray-300 dark:border-gray-700'
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>

        <button
          className='btn-primary'
          type='button'
          onClick={handleFilterClick}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
