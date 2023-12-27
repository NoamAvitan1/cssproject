import { useCheckImg } from "@/app/_hooks/useCheckImg";
import { FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiUser } from "react-icons/hi2";
import { SiAtom } from "react-icons/si";

interface Profile {
  id: string;
  user_name: string;
  profile_pic?: string;
  about: string;
  module_count: number;
}

type Props = {
  profile: Profile;
};

export const SearchProfileComponent = ({ profile }: Props) => {
  const router = useRouter();

  return (
    <button
      title={`Go to ${profile.user_name}'s profile page`}
      onClick={() => router.push("/profile/id/" + profile.id)}
      className="rounded bg-secondary p-1 text-start shadow"
    >
      <div className="flex aspect-square w-full items-center">
        {profile.profile_pic ? (
          <img
            className="w-10/12 rounded-full m-auto"
            src={profile.profile_pic ? profile.profile_pic : undefined}
            alt=""
          />
        ) : (
          <div className="flex aspect-square w-full items-center">
            <FiUser className="h-[40px] w-[40px]" />
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-between">
        <h1 className="flex items-center gap-1 font-bold">
          <HiUser />
          {profile.user_name}
        </h1>
        <p className="flex items-center gap-1">
          <SiAtom />
          {profile.module_count}
        </p>
      </div>
      {profile.about && <p>{profile.about.substring(0, 20)}...</p>}
    </button>
  );
};
