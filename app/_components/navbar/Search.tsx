'use client'
import {AiOutlineSearch} from 'react-icons/ai'
type Props = {

};

export const Search: React.FC<Props> = (props) => {

  return (
    <div className='flex justify-center items-center'>
        <section className='border border-gray-600 p-2 border-r-0 rounded-l-sm'>{<AiOutlineSearch className=''/>}</section>
        <section className='border border-gray-600 border-l-0 rounded-r-sm'><input className='bg-primary w-[600px] p-1 outline-none focus:ring-blue-600 focus:ring-1 focus:rounded-sm' type="text" placeholder='search'/></section>
    </div>
  );
};
