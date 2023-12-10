"use client";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { MdOutlineEdit } from "react-icons/md";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { EditProfile } from "./EditProfile";
import { tell } from "../teller/Tale";
import { FiUser } from "react-icons/fi";
import axios from "axios";

type Profile = Database["public"]["Tables"]["profile"]["Row"];

type Props = {
  params: string;
};

export const UserData = (props: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const update = async () => {
      let { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", props.params);
      if (error) {
        if (typeof window !== undefined) tell("Couldn't find profile", "error");
        return;
      }
      setProfile(data && data[0] ? data[0] : null);
    };
    update();
  }, []);

  const checkImg = async (url: string) => {
    axios.get(url)
    .then(() => setImageUrl(url))
    .catch(() => !imageUrl && setImageUrl(null));
  }

  useEffect(() => {
    if (!profile?.id) return
    const url = `https://ielhefdzhfesqnlbxztn.supabase.co/storage/v1/object/public/profile%20pic/${profile?.id}/${profile?.id}`;
    
    checkImg(url);
  }, [profile]);

  
  return (
    <div className="mt-6 w-full">
      {profile && (
        <main className="container border border-secondary">
          <article className="flex flex-col gap-5 p-2 md:flex-row">
            <section className="h-full md:w-1/3">
              {imageUrl ? (
                <img
                  className="aspect-square h-full w-full rounded-md"
                  src={imageUrl!}
                  alt=""
                />
              ) : (
                <div className="h-full w-full border p-4">
                  <FiUser className="h-full w-full" />
                </div>
              )}
            </section>
            <section className="flex flex-col gap-5 md:w-2/3">
              <div className="flex justify-between">
                <section className="flex flex-col gap-3 [&_*]:w-fit [&_*]:rounded-md [&_*]:border [&_*]:border-text [&_*]:p-1">
                  <p className="">{profile?.user_name}</p>
                  <p className="">{profile?.email}</p>
                </section>
                {user?.id === profile?.id && (
                  <section>
                    <MdOutlineEdit
                      onClick={() => setIsOpen(true)}
                      className="-mt-1 cursor-pointer rounded-full bg-secondary p-2 text-4xl text-text"
                    />
                    <EditProfile
                      profile={profile}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                  </section>
                )}
              </div>
              <div className="flex h-full items-center justify-center">
                <div className="w-full rounded-md bg-secondary p-2 text-sm xl:text-[17px]">
                  {profile?.about ? (
                    <p className="h-full break-normal">{profile?.about}</p>
                    ) : (
                      <p>Go edit your profile and write about yourself...</p>
                  )}
                </div>
              </div>
            </section>
          </article>
        </main>
      )}
    </div>
  );
};
