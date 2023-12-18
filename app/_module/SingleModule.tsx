'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type Props = {

};

export const SingleModule = (props: Props) => {
    const supabase = createClientComponentClient();
    const {id} = useParams();
    const getModule = async() => {
      if(!id) return;
        const { data: module, error } = await supabase.from("module").select("*").eq("id",id);
    }
    
    useEffect(() => {
      getModule();
    },[])
  return (
    <div>

    </div>
  );
};
