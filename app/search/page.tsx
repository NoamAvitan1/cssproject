'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UsersSearch } from "./UsersSearch";
import { ModulesSearch } from "./ModulesSearch";

type Props = {

};

export default function page(props: Props){
  const [type,setType] = useState<'users' | 'modules'>('users');
  
  useEffect(() => {
  },[])
  return (
    <div className="w-full h-full mt-7">
      <section className="flex justify-center gap-4">
        <button className={`${type === 'modules' ? 'text-blue-500' : ''} text-2xl`} onClick={()=>setType('modules')}>modules</button>
        <button className={`${type === 'users' ? 'text-blue-500' : ''} text-2xl`} onClick={()=>setType('users')}>users</button>
      </section>
        {type === 'users' ? 
          <UsersSearch />    :
          <ModulesSearch />    
        }
    </div>
  );
};
