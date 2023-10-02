"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import { Database } from "@/types/supabase";
import { useState } from "react";

type Module = Database["public"]["Tables"]["module"]["Row"];

type Props = {
  modules: Module;
};

export const MenuModule = (props: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="">
      <button
        className="z-20 absolute right-2 top-4 text-text"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>
        <div
          className={`absolute bg-opacity-30 inset-0 duration-300 bg-black  ${
            !toggle && "translate-x-full"
          }`}
        ></div>
    </div>
  );
};
