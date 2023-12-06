"use client";

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai"
import { userAtom } from "../../app/_jotai/userAtoms"
import Api from '../../utils/axios'


type Props = {};


export const AddModule: React.FC<Props> = (props) => {
    const supabase = createClientComponentClient<Database>();
    const [user, setUser] = useAtom(userAtom)
    const moduleData = [
      { 
        title: "testMaoz",
        description:"testMaoz",
        code: "your_code_value4",
        price: 99.99,
        user_id:`${user?.id}`,
      },
    ];
  
    //   const handleButton = async() => {
    //     const { data, error } = await supabase
    //     .from("module")
    //     .insert(moduleData)
    //     .select();

    //     console.log(error);
    //   } 
  const handleRoute = async() => {
    await fetch(`/module/`,{
      method : "POST",
      body: JSON.stringify(moduleData)
    })
  }
  
  
    return <button onClick={handleRoute}> 
      press here 
    </button>;
  };
  
