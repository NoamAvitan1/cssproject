"use client";
import { profileAtom, userAtom } from "@/app/_jotai/userAtoms";
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
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [profile, setProfile] = useAtom(profileAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClientComponentClient();

  const handleClick = async () => {
    await useSignOut(() => setUser(null));
  };

  useEffect(() => {
    if (!user?.id || profile?.id) return;
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user?.id);
      setProfile(data && data[0] ? data[0] : null);
    };
    getProfile();
  }, [user]);

  return (
    <div
      className="relative"
      onClick={() => {if(!user){tell("Please Sign in",'alert'),router.push('/login')}}}
      onPointerEnter={() => setIsModalOpen(true)}
      onPointerLeave={() => setIsModalOpen(false)}
    >
      <button className="">
        <FiUser />
      </button>
      {isModalOpen && user && (
        <div className="absolute right-0 top-full z-20 w-[200px] rounded-b border-b border-slate-500 bg-secondary p-2 shadow-xl">
          {profile?.profile_pic && (
            <img src={profile?.profile_pic} className="aspect-square w-full" />
          )}
          <h1 className={`text-sm ${!profile?.profile_pic && "pt-2"}`}>
            Logged as: {profile?.user_name}
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
