'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

type Props = {

};

export const UserModule = (props: Props) => {
    const supabase = createClientComponentClient();
    const {id} = useParams();
    const getModules = async() => {
        const { data: modules, error } = await supabase.from("module").select("*").eq("user_id",id);
    }

  return (
    <div>

    </div>
  );
};
