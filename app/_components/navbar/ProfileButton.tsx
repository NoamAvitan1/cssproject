"use client";
import { useCheckUserImg } from "@/app/_hooks/useCheckUserImg";
import { userAtom } from "@/app/_jotai/userAtoms";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { tell } from "../teller/Tale";
import { useSignOut } from "@/app/_hooks/useLogOut";

type Props = {
  setIsVeilOpen: Function;
};

export const ProfileButton = (props: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);

  const supabase = createClientComponentClient()

  const router = useRouter();

  const handleClick = async () => {
    await useSignOut(() => setUser(null));
  }

  useEffect(() => {
    if (!user) return;
    (async () => {
      const url = await useCheckUserImg(user);
      setImgUrl(url ?? undefined);
    })()
  }, [user]);

  return (
    <div
      className="relative"
      onPointerEnter={() => setIsModalOpen(true)}
      onPointerLeave={() => setIsModalOpen(false)}
    >
      <button className="">
        <FiUser />
      </button>
      {isModalOpen && (
        <div className="absolute right-0 z-20 border-b top-full w-[200px] rounded-b border-slate-500 bg-secondary p-2 shadow-xl">
          <img src={imgUrl} className="aspect-square w-full" />
          <h1 className="text-sm">Logged as: {user?.user_metadata.name}</h1>
          <Link className="text-sm text-blue-300 underline" href={`/profile/id/${user?.id}`}>
            go to profile page
          </Link>
          <button onClick={handleClick} className="text-sm w-full text-start text-error underline" >Sign out</button>
        </div>
      )}
    </div>
  );
};
