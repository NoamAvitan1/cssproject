"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiUser } from "react-icons/fi";


type Props = {};
 

export const ProfileButton: React.FC<Props> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();
  return (
    <button>
      <FiUser onClick={()=>router.push('/profile')}/>
    </button>
  );
};
