import { useCheckImg } from "@/app/_hooks/useCheckImg";
import { FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";

interface Profile {
  id: string;
  user_name: string;
  profile_pic?: string;
}

type Props = {
  profile: Profile;
};

export const SearchProfileComponent = ({ profile }: Props) => {

  return (
    <a
      title={`Go to ${profile.user_name}'s profile page`}
      href={"/profile/id/" + profile.id}
      className="flex items-center gap-4"
    >
      <div className="flex relative h-[50px] w-[50px] items-center border">
        {profile.profile_pic ? (
          <img
            className="w-full"
            src={profile.profile_pic ? profile.profile_pic : undefined}
            alt=""
          />
        ) : (
          <div className="h-[40px] w-[40px] p-2">
            <FiUser className="h-full w-full" />
          </div>
        )}
      </div>
      <h1 className="font-bold">{profile.user_name}</h1>
    </a>
  );
};
