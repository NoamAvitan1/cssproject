"use client";
import { useEffect, useState } from "react";
import { Logo } from "../_components/common/Logo";
import { ThemeChangeButton } from "../_components/layout/ThemeChangeButton";
import { NotificationsButton } from "../_components/navbar/NotificationsButton";
import { ProfileButton } from "../_components/navbar/ProfileButton";
import { SearchBar } from "../_components/navbar/SearchBar";
import { AiOutlineSearch } from "react-icons/ai";
import { SlideMenu } from "../_components/navbar/SlideMenu";

type Props = {};

export const NavBar: React.FC<Props> = (props) => {
  const [flag, setFlag] = useState<boolean>(false);
  return (
    <div className="relative flex h-[5vh] min-h-[45px] w-full items-center justify-between bg-secondary px-4 shadow">
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
        <NotificationsButton />
        <ProfileButton />
      </div>
    </div>
  );
};
