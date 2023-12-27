"use client";
import { useClient } from "@/app/_hooks/useClient";
import { useSignOut } from "@/app/_hooks/useLogOut";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

type Props = {};

export const SignOutBtn = (props: Props) => {
  const { id } = useParams();
  const [user, setUser] = useAtom(userAtom);
  const isClient = useClient()

  const handleClick = async () => {
    await useSignOut(() => setUser(null));
  };

  return (
    isClient && user?.id === id && (
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-center gap-2 bg-secondary p-2"
      >
        Sign Out <HiOutlineArrowLeftOnRectangle />
      </button>
    )
  );
};
