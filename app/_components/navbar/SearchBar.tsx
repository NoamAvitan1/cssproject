'use client'
import {AiOutlineSearch} from 'react-icons/ai'
type Props = {

};

export const SearchBar: React.FC<Props> = (props) => {

  return (
    <div className='w-2/3 max-w-[600px] flex justify-center bg-background items-center border border-aura rounded-lg overflow-hidden'>
        <figure className='p-2'>
          <AiOutlineSearch />
        </figure>
        <input className='w-full p-1 rounded-r-md focus:outline-none bg-transparent' type="text" placeholder='search'/>
    </div>
  );
};
