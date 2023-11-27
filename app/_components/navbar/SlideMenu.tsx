'use client'

import { useState } from "react";
import { SideBarMenu } from "../sideBar/SideBarMenu";

type Props = {

};

export const SlideMenu = (props: Props) => {
    const [toggle,setToggle] = useState<boolean>(false);
  return (
    <div className="">
        <div onClick={()=>setToggle(!toggle)} className="cursor-pointer">
            <span className={`h-1 w-6 bg-text block m-1 transition-all ease-in-out duration-200 ${toggle ? 'transform translate-y-2 rotate-45' : ''}`}></span>
            <span className={`h-1 w-6 bg-text block m-1 ${toggle ? 'opacity-0' : 'transition-all ease-in-out duration-300'}`}></span>
            <span className={`h-1 w-6 bg-text block m-1 transition-all ease-in-out duration-200 ${toggle ? 'transform -translate-y-2 -rotate-45' : ''}`}></span>
        </div>
        <div className={`fixed top-12 transition-all duration-200 ${toggle ? 'left-0 z-10 bg-background' : '-left-full'}`}>
            <SideBarMenu/>
        </div>
    </div>
  );
};
