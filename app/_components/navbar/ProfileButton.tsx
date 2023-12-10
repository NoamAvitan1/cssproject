"use client";
import { useCheckUserImg } from "@/app/_hooks/useCheckUserImg";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";

type Props = {
  setIsVeilOpen: Function;
};

export const ProfileButton = (props: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const url = useCheckUserImg(user);
    setImgUrl(url ?? undefined);
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
        <div className="absolute right-0 top-full w-[200px] rounded-b border-text bg-secondary p-2 shadow-xl">
          <img src={imgUrl} className="aspect-square w-full" />
          <h1 className="text-sm">Logged as: {user?.user_metadata.name}</h1>
          <Link className="text-sm text-blue-300 underline" href={`/profile/id/${user?.id}`}>
            go to profile page
          </Link>
        </div>
      )}
    </div>
  );
};
