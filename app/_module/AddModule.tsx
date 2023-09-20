"use client";

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai"
import { userAtom } from "../../app/_jotai/userAtoms"

type Props = {};


export const AddModule: React.FC<Props> = (props) => {
    const supabase = createClientComponentClient<Database>();
    const [user, setUser] = useAtom(userAtom)
    const moduleData = [
      { 
        title: "test",
        description:"test",
        code: "your_code_value",
        price: 99.99,
        profile_id:`${user?.identities?.[0]?.id}`,
      },
    ];
  
      const handleButton = async() => {
        const { data, error } = await supabase
        .from("module")
        .insert(moduleData)
        .select();

        console.log(error);
      } 
  
  
    return <button onClick={handleButton}> 
      press here 
    </button>;
  };
  
