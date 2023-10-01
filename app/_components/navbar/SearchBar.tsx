'use client'
import {AiOutlineSearch} from 'react-icons/ai'
type Props = {

};

export const SearchBar: React.FC<Props> = (props) => {

  return (
    <div className='col-span-2  w-full max-w-[600px] justify-self-center flex justify-center bg-background items-center border-2 border-aura rounded-lg overflow-hidden'>
        <figure className='p-2'>
          <AiOutlineSearch />
        </figure>
        <input className='w-full p-1 rounded-r-md focus:outline-none bg-transparent border-l border-l-aura ' type="text" placeholder='search'
        defaultValue={`אַשְׁרֵי הַגַּפְרוּר שֶׁנִּשְׂרַף וְהִצִּית לֶהָבוֹת,
        אַשְׁרֵי הַלֶּהָבָה שֶׁבָּעֲרָה בְּסִתְרֵי לְבָבוֹת.
        אַשְׁרֵי הַלְּבָבוֹת שֶׁיָדְעוּ לַחְדֹּל בְּכָבוֹד.
        אַשְׁרֵי הַגַּפְרוּר שֶׁנִּשְׂרַף וְהִצִּית לֶהָבוֹת.`}/>
    </div>
  );
};
