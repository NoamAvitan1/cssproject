"use client";
import Link from "next/link";
import { useState } from "react";
import { FiUser } from "react-icons/fi";


type Props = {};
 

export const ProfileButton: React.FC<Props> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <button>
      <FiUser onClick={() => setToggle(!toggle)} />
      {toggle && <div className="absolute z-10 top-12 right-2 bg-dark w-1/6 text-aura h-[300px] rounded-md shadow-secondary shadow-xl">
        <Link onClick={()=>setToggle(!toggle)} href={'/profile'}>profile</Link> 
        </div>} 
    </button>
  );
};
