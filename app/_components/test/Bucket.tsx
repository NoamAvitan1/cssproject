"use client";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
type Props = {};

export const Bucket = (props: Props) => {
    const [user, setUser] = useAtom(userAtom);
    
    const supabase = createClientComponentClient();
  
  const onClick = async (e: any) => {
    const avatarFile = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("profile pic")
      .upload(`${user?.id}/${user?.id}`, avatarFile, {
        cacheControl: "3600",
        upsert: true, 
      });
  };

  return (
      <div>
      <input onChange={onClick} type="file" />
      </div>
  );
};
