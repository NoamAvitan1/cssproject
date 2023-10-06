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
        className="absolute right-2 top-4 z-20 text-text"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>
      <div
        className={`absolute inset-0 bg-background bg-opacity-90 duration-300  ${
          !toggle && "translate-x-full"
        }`}
      >
        <p className="p-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit corporis
          fugiat commodi fuga consequatur! Animi, iusto reprehenderit et odit
          placeat in ab repudiandae doloribus recusandae minus dolorum, esse
          quas provident?
        </p>
      </div>
    </div>
  );
};
