'use client'

import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type Props = {

};

export const PasswordUpdateButton = (props: Props) => {
    const [user,setUser] = useAtom(userAtom);
    const update = async() => {
        try {
             await fetch('/auth/recover-password?id=' + user?.id,
                {
                    method: 'POST',
                    body: JSON.stringify({email:user?.email})
                }) 
            } catch (error) {
                
            }
        }
        const params = useParams();
        useEffect(()=> {
            // console.log(params);
        },[])
  return ( params.id === user?.id && (
        <button className="w-full border border-error shadow text-lg hover:font-bold p-2 hover:bg-error duration-300 hover:text-black hover:border-black" onClick={update}>Change password</button>
  ));
};



// npx supabase gen types typescript --project-id ielhefdzhfesqnlbxztn --schema public > types/supabase.ts

