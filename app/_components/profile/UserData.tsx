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
        <article className="flex flex-row items-start p-2 relative justify-between">
           <section className="flex md:flex-row flex-col gap-5 w-full">
             <img className="md:w-2/3 lg:w-1/4 w-full rounded-md" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                <MdOutlineEdit  className="absolute right-3 z-10 top-4 text-text text-xl cursor-pointer"/>
           </section>
        </article>
      </main>
    }
    </div>
  );
};


// <section className="w-3/5 flex flex-col p-2 justify-center items-center relative border border-text rounded">
// </section>
