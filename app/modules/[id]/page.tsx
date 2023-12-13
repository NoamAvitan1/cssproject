'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useState } from "react";

type Props = {

};

export const page = (props: Props) => {
  const [modules, setModules] = useState();
  const {id} = useParams();
  const supabase = createClientComponentClient();
  const updateModules = async () => {
    let { data, error } = await supabase
      .from("module")
      .select(`*, user_id(*)`)
      .eq("user_id", id)
      .range(0, 2);
    setModules(data);
    // console.log(data);
  };

  useEffect(() => {
    updateModules();
  }, []);
  return (
    <div>

    </div>
  );
};
