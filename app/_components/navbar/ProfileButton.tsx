"use client";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiUser } from "react-icons/fi";

type Props = {
  setIsVeilOpen: Function;
};

export const ProfileButton = (props: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter();

  const handleClick = () => {
    props.setIsVeilOpen((prev: boolean) => !prev)
    setIsModalOpen(prev => !prev)
  }
  {console.log(user?.user_metadata)}

  return (
    <>
      <button
        className="relative z-10"
        onClick={handleClick}
      >
        <FiUser onClick={() => router.push(`/profile/id/${user?.id}`)} />
      </button>
      {isModalOpen && <div className="absolute grid col-span-2 border-text top-full">
        <img src={user?.user_metadata.picture} alt="profile pic" />
        <h1>{user?.user_metadata.name}</h1>
      </div>}
    </>
  );
};
