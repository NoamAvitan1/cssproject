'use client'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'

import { Database } from "@/types/supabase";
import { useState } from "react";

type Module = Database['public']['Tables']['module']['Row']

type Props = {
    modules: Module;
};

export const MenuModule = (props: Props) => {
  const [toggle,setToggle] = useState<boolean>(false);

  return (
    <div className=''>
      <button className='z-10 absolute right-2 top-4 text-text' onClick={()=>setToggle(!toggle)}>{toggle ?<AiOutlineClose/> :<GiHamburgerMenu/> }</button>
      {toggle ?<div className={`absolute bg-black w-full h-full top-0 bg-opacity-30 rounded-md right-full duration-200  ${toggle ?'translate-x-full':''}`}>

      </div> :''}
    </div>
  );
};

