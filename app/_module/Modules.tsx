'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import {GiHamburgerMenu} from 'react-icons/gi'
type Props = {};

export const Modules: React.FC<Props> = (props) => {
    type module = Database['public']['Tables']['module']['Row'];
    const [modules,setModules] = useState<module[] | null>(null);
    const supabase = createClientComponentClient();
    const getModules = async() => {
        let { data, error } = await supabase.from("module").select("*");
        setModules(data);
    }
    useEffect(()=> {
        getModules();
    },[])

    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
          {modules ? modules.map((v, i) => (
            <div className="bg-secondary h-52 w-72 flex items-baseline justify-between p-2 rounded-md" key={i}>
               <p className="text-xl">
                    {v.title}
                </p>
                <button className="text-xl">
                <GiHamburgerMenu/>
                </button>
            </div>
          )) : null}
        </div>
      );
      
};
