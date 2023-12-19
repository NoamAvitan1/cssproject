import { useCheckImg } from "@/app/_hooks/useCheckImg";
import { FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";

interface Profile {
  id: string;
  user_name: string;
}

type Props = {
  profile: Profile;
};

export const SearchProfileComponent = ({ profile }: Props) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const getPic = async () => {
      const url = `https://ielhefdzhfesqnlbxztn.supabase.co/storage/v1/object/public/profile%20pic/${profile?.id}/${profile?.id}`;
      const bool = await useCheckImg(url);
      if (bool) setImgUrl(url);
    };
    getPic();
  }, [profile]);
  return (
    <a
      title={`Go to ${profile.user_name}'s profile page`}
      href={"/profile/id/" + profile.id}
      className="flex items-center gap-4"
    >
      <div className="flex relative h-[50px] w-[50px] items-center border">
        {imgUrl ? (
          <img
            className="w-full"
            src={imgUrl ? imgUrl : undefined}
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
