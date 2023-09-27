'use client'
import {GiHamburgerMenu} from 'react-icons/gi'

import { Database } from "@/types/supabase";
import { useState } from "react";

type Module = Database['public']['Tables']['module']['Row']

type Props = {
    modules: Module;
};

export const MenuModule = (props: Props) => {
  const [toggle,setToggle] = useState<boolean>(false);

  return (
    <div className={`${toggle ? 'bg-red-600' :''}`} onClick={()=>setToggle(!toggle)}>
        <GiHamburgerMenu/>
    </div>
  );
};
