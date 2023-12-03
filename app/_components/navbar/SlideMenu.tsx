"use client";

import { useEffect, useState } from "react";
import { SideBarMenu } from "../sideBar/SideBarMenu";

type Props = {};

export const SlideMenu = (props: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 550) {
        setToggle(false);
      }
    };
  
    window.addEventListener("resize", () => handleResize());
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="">
      <div onClick={() => setToggle(!toggle)} className="cursor-pointer">
        <span
          className={`m-1 block h-1 w-6 bg-text transition-all duration-200 ease-in-out ${
            toggle ? "translate-y-2 rotate-45 transform" : ""
          }`}
        ></span>
        <span
          className={`m-1 block h-1 w-6 bg-text ${
            toggle ? "opacity-0" : "transition-all duration-300 ease-in-out"
          }`}
        ></span>
        <span
          className={`m-1 block h-1 w-6 bg-text transition-all duration-200 ease-in-out ${
            toggle ? "-translate-y-2 -rotate-45 transform" : ""
          }`}
        ></span>
      </div>
      <div
        className={`fixed top-[45px] h-full transition-all duration-300 ${
          toggle ? "left-0 z-10 bg-background" : "-left-full"
        }`}
      >
        <SideBarMenu toggle={toggle} setToggle={setToggle}/>
      </div>
    </div>
  );
};
