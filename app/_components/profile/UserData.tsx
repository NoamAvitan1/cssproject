"use client";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { MdOutlineEdit } from "react-icons/md";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { EditProfile } from "./EditProfile";
type Profile = Database["public"]["Tables"]["profile"]["Row"];

type Props = {
  params: string;
};

export const UserData = (props: Props) => {
  const [user,setUser] = useAtom(userAtom);
  const [isOpen,setIsOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile[] | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const update = async () => {
      let { data , error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", props.params);
        setProfile(data)
    };  
    update();
  },[])


  console.log(profile);

  return (
    <div className="w-full mt-6">
      {profile &&
      <main className="container border border-secondary">
        <article className="flex flex-col lg:flex-row p-2 gap-5">
           <section className="flex md:flex-row flex-col gap-5 xl:w-1/4 lg:w-1/3">
             <img className="rounded-md" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
           </section>
           <section className="flex flex-col lg:w-2/3 xl:w-3/4 gap-5">
            <div className="flex justify-between">
              <section className="flex flex-col gap-3 [&_*]:w-fit [&_*]:border border-primary [&_*]:p-1 [&_*]:rounded-md">
                <p className="">{profile[0]?.user_name}</p>
                <p className="">{profile[0]?.email}</p>
              </section>
              {user?.id === profile[0]?.id &&
              <section>
                <MdOutlineEdit onClick={()=>setIsOpen(true)} className="text-text text-4xl p-2 cursor-pointer bg-secondary rounded-full -mt-1"/>
                <EditProfile profile = {profile[0]} isOpen = {isOpen} setIsOpen = {setIsOpen}/>
              </section>}
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="w-full bg-secondary rounded-md p-2 xl:text-[17px] text-sm">
                {profile[0]?.about === "" ? <p>Go edit your profile and write about yourself...</p> : <p>{profile[0]?.about}</p>}
              </div>
            </div>
           </section>
        </article>
      </main>
    }
    </div>
  );
};


