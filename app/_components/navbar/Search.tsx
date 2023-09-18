'use client'
import {AiOutlineSearch} from 'react-icons/ai'
type Props = {

};

export const Search: React.FC<Props> = (props) => {

  return (
    <div className='flex justify-center items-center'>
        <section className='border border-gray-600 p-2 border-r-0 rounded-l-md'>{<AiOutlineSearch className=''/>}</section>
        <section className=''><input className='bg-background w-[600px] p-1 rounded-r-md outline-none  border border-gray-600' type="text" placeholder='search'/></section>
    </div>
  );
};
