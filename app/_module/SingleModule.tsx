'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { tell } from "../_components/teller/Tale";
import { Database } from "@/types/supabase";

type Module = Database["public"]["Tables"]["module"]["Row"]
type Props = {

};

export const SingleModule = (props: Props) => {
    const [module,SetModule] = useState<Module | null>()
    const supabase = createClientComponentClient();
    const {id} = useParams();
    const getModule = async() => {
      if(!id) return;
      try {
        const { data, error } = await supabase.from("module").select("*").eq("id",id);
        SetModule(data && data[0]);
        if(!data) tell('Module not found')
      } catch (error) {
        tell('Error loading module','error');
      }
    }
    
    useEffect(() => {
      getModule();
    },[])
    
  return (
    <div>

    </div>
  );
};
