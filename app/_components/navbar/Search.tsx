'use client'
import {AiOutlineSearch} from 'react-icons/ai'
type Props = {

};

export const Search: React.FC<Props> = (props) => {

  return (
    <div className='absolute w-2/3 max-w-[600px] flex justify-center bg-background items-center border border-aura rounded-lg overflow-hidden left-1/2 -translate-top-1/2 -translate-x-1/2'>
        <figure className='p-2'>
          <AiOutlineSearch/>
        </figure>
        <input className='w-full p-1 rounded-r-md focus:outline-none bg-transparent' type="text" placeholder='search'/>
    </div>
  );
};
