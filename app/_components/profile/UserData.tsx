"use client";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { MdOutlineEdit } from "react-icons/md";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
type Profile = Database["public"]["Tables"]["profile"]["Row"];

type Props = {
  params: string;
};

export const UserData = (props: Props) => {
  const [user, setUser] = useState<Profile[] | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const update = async () => {
      let { data , error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", props.params);
        setUser(data)
    };  
    update();
  },[])


  console.log(user);

  return (
    <div className="w-full mt-6">
      {user &&
      <main className="container border border-secondary">
        <article className="flex flex-col lg:flex-row p-2 gap-5">
           <section className="flex md:flex-row flex-col gap-5 xl:w-1/4 lg:w-1/3">
             <img className="rounded-md" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
           </section>
           <section className="flex flex-col lg:w-2/3 xl:w-3/4 justify-between gap-3">
            <div className="flex justify-between">
              <section className="flex flex-col gap-3">
                <p className="border border-primary p-1 rounded-md w-fit">{user[0]?.user_name}</p>
                <p className="border border-primary p-1 rounded-md">{user[0]?.email}</p>
              </section>
              <section>
                <MdOutlineEdit  className="text-text text-4xl p-2 cursor-pointer bg-secondary rounded-full -mt-1"/>
              </section>
            </div>
            <div className="w-full bg-secondary rounded-md p-2 xl:text-[17px] text-sm">
              <p>{user[0]?.about}</p>
            </div>
           </section>
        </article>
      </main>
    }
    </div>
  );
};


