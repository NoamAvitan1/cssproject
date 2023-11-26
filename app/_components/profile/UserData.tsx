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


  console.log(user)

  return (
    <div className="flex flex-col-reverse md:flex-row items-start container">
      <aside className="w-1/4">sadas</aside>
      <main className="container pt-2 [&_*]:border [&_*]:border-black">
        <article className="flex flex-row items-start">
           <img className="w-1/3 rounded" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
           <section className="grow"></section>
          <section className="flex items-center gap-1">
              {/* <span><MdOutlineEdit  className=""/></span> */}
              <span>Edit</span>
          </section>
        </article>
      </main>
    </div>
  );
};


// <section className="w-3/5 flex flex-col p-2 justify-center items-center relative border border-text rounded">
// </section>
