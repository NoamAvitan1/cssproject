'use client'

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Module = Database['public']['Tables']['module']['Row'];
type Props = {

};

export const page = (props: Props) => {
  const [modules, setModules] = useState<Module[] | null>(null);
  const {id} = useParams();
  const supabase = createClientComponentClient();
  const updateModules = async () => {
    let { data, error } = await supabase
      .from("module")
      .select(`*, user_id(*)`)
      .eq("user_id", id)
      .range(0, 2);
    setModules(data);
  };

  useEffect(() => {
    updateModules();
  }, []);
  return (
    <div>

    </div>
  );
};
