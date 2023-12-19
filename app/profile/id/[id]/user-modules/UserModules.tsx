"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { Module } from "@/app/_module/Module";
import { ModulesData } from "@/app/_module/ModulesData";

type Modules = Database["public"]["Tables"]["module"]["Row"];
type Props = {};

export const UserModules = (props: Props) => {
  const [page, setPage] = useState<number>(0);
  const [modules, setModules] = useState<Modules[] | null>(null);
  const { id } = useParams();
  const supabase = createClientComponentClient();
  const [flag, setFlag] = useState<boolean>(true);
  const [array,setArray] = useState<number[]>();

  const getLength = async () => {
    let { count, error } = await supabase
      .from("module")
      .select(`*`, { count: "exact", head: true })
      .eq("user_id", id);
    if (count) {
      let pages = Math.ceil(count / 9);
      setArray(new Array(pages).fill(0));
    }
  };

  const updateModules = async () => {
    let { data, error } = await supabase
      .from("module")
      .select(`*, user_id(*)`)
      .eq("user_id", id)
      .range((page * 9), (page * 9) + 8);
    setModules(data);
  };

  const navigatePages = (i:number) => {
    if(page === i)return;
    setPage(i);
  }

  useEffect(() => {
    updateModules();
  }, [page]);

  useEffect(() => {
    if (flag) {
      setFlag(false);
      getLength();
    }
  }, []);
  return (
    <div className="w-full flex flex-col items-center gap-4 ">
      <div className="w-10/12">
      <ModulesData modules={modules}/>
      </div>
      {array?.length ? <nav className="flex justify-center items-center gap-4">
        {array?.map((v,i) => (
        <button className={`${page === i ?'text-blue-400':''} text-lg`} onClick={()=>navigatePages(i)}>{i}</button>
        ))}
      </nav> : null}
    </div>
  );
};
