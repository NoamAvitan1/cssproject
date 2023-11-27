'use client'
import { useState } from "react";
import { Logo } from "../_components/common/Logo";
import { ThemeChangeButton } from "../_components/common/ThemeChangeButton";
import { NotificationsButton } from "../_components/navbar/NotificationsButton";
import { ProfileButton } from "../_components/navbar/ProfileButton";
import { SearchBar } from "../_components/navbar/SearchBar";
import { AiOutlineSearch } from "react-icons/ai";
import { SlideMenu } from "../_components/navbar/SlideMenu";

type Props = {};

export const NavBar: React.FC<Props> = (props) => {
    const [flag,setFlag] = useState<boolean>(false);
  return (
    <div className="relative flex items-center justify-between h-[5vh] min-h-[45px] w-full bg-secondary px-4 shadow">
      <div className="flex items-center gap-5">
        <div className="xs:hidden block"><SlideMenu/></div>
          <Logo />
      </div>
      <SearchBar flag = {flag} setFlag = {setFlag}/>
      <div className="flex items-center justify-end gap-6 xs:gap-10 text-xl xs:text-2xl">
      <AiOutlineSearch onClick={()=>setFlag(!flag)} className={`text-xl ${flag ? 'hidden' : 'block'} block xs:hidden cursor-pointer`}/>
        <ThemeChangeButton />
        <NotificationsButton />
        <ProfileButton />
      </div>
    </div>
  );
};
