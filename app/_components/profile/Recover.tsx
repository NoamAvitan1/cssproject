'use client'

import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {

};

export const Recover = (props: Props) => {
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
        const params = useSearchParams();
        useEffect(()=> {
            console.log(params);
        },[])
  return (
    <div>
        <button onClick={update}>prsss here</button>
    </div>
  );
};
