"use client";
import { useState } from "react";
import { Logo } from "../_components/common/Logo";
import { ThemeChangeButton } from "../_components/layout/ThemeChangeButton";
import { ProfileButton } from "../_components/navbar/ProfileButton";
import { SearchBar } from "../_components/navbar/SearchBar";
import { AiOutlineSearch } from "react-icons/ai";
import { SlideMenu } from "../_components/navbar/SlideMenu";

type Props = {};

export const NavBar: React.FC<Props> = (props) => {
  const [flag, setFlag] = useState<boolean>(false);
  const [isVeilOpen, setIsVeilOpen] = useState(false);

  return (
    <div className="relative md:grid flex grid-cols-4 xl:grid-cols-5 h-[5vh] min-h-[45px] w-full items-center justify-between bg-secondary px-4 shadow">
      {isVeilOpen && <div onClick={() => setIsVeilOpen(false)} className='fixed inset-0'></div>}
      <div className="flex items-center gap-5">
        <div className="block xs:hidden">
          <SlideMenu />
        </div>
        <Logo />
      </div>
      <SearchBar flag={flag} setFlag={setFlag} />
      <div className="flex items-center justify-end gap-6 text-xl xs:gap-10 xs:text-2xl">
        <AiOutlineSearch
          onClick={() => setFlag(!flag)}
          className={`text-xl ${
            flag ? "hidden" : "block"
          } block cursor-pointer xs:hidden`}
        />
        <ThemeChangeButton />
        {/* <NotificationsButton /> */}
        <ProfileButton setIsVeilOpen={setIsVeilOpen} />
      </div>
    </div>
  );
};
