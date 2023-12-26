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
import { getUserImg } from "@/utils/getUserImg";

type Props = {
  setIsVeilOpen: Function;
};

export const ProfileButton = (props: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);

  const handleClick = async () => {
    await useSignOut(() => setUser(null));
  };

  // useEffect(() => {
  //   if (!user) return;
  //   (async () => {
  //     getUserImg(user);
  //     const url = await useCheckUserImg(user);
  //     setImgUrl(url ?? undefined);
  //   })();
  // }, [user]);

  return (
    <div
      className="relative"
      onPointerEnter={() => setIsModalOpen(true)}
      onPointerLeave={() => setIsModalOpen(false)}
    >
      <button className="">
        <FiUser />
      </button>
      {isModalOpen && user && (
        <div className="absolute right-0 top-full z-20 w-[200px] rounded-b border-b border-slate-500 bg-secondary p-2 shadow-xl">
          <img src={getUserImg(user)} className="aspect-square w-full" />
          <h1 className={`text-sm ${!getUserImg(user) && "pt-2"}`}>
            Logged as: {user?.user_metadata.user_name}
          </h1>
          <Link
            className="text-sm text-blue-300 underline"
            href={`/profile/id/${user?.id}`}
          >
            go to profile page
          </Link>
          <button
            onClick={handleClick}
            className="w-full text-start text-sm text-error underline"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
