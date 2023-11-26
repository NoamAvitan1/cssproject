"use client";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiUser } from "react-icons/fi";


type Props = {};
 

export const ProfileButton: React.FC<Props> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [user,setUser] = useAtom(userAtom);
  const router = useRouter();
  return (
    <button>
      <FiUser onClick={()=>router.push(`/profile/${user?.id}`)}/>
    </button>
  );
};
