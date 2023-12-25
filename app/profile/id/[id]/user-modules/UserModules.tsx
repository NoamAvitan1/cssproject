"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ModulesData } from "@/app/_module/ModulesData";
import { ModulesType } from "@/types/Modules";

type Props = {
  type: "public" | "paid" | "all";
};

export const UserModules = (props: Props) => {
  const [page, setPage] = useState<number>(0);
  const [modules, setModules] = useState<ModulesType[] | null>(null);
  const { id } = useParams();
  const supabase = createClientComponentClient();
  const [array, setArray] = useState<number[]>();

  const getLength = async () => {
    const supabaseQury = supabase
      .from("module")
      .select('examples_count,access_type,created_at,description,downloads,id,price,title,title_description,user_id(id,user_name)', { count: "exact", head: true })
      .eq("user_id", id);
    if (props.type !== "all") {
      supabaseQury.eq("access_type", props.type);
    }
    let { count, error } = await supabaseQury;
    if (count) {
      let pages = Math.ceil(count / 9);
      setArray(new Array(pages).fill(0));
    }
  };

  const getModules = async () => {
    const supabaseQury = supabase
    .from("module")
    .select('examples_count,access_type,created_at,description,downloads,id,price,title,title_description,user_id(id,user_name)')
    .eq("user_id", id)
    .range(page * 9, page * 9 + 8);
    if (props.type !== "all") {
      supabaseQury.eq("access_type", props.type);
    }
    let { data, error } = await supabaseQury 
    setModules(data as ModulesType[] | null);
  };

  const navigatePages = (i: number) => {
    if (page === i) return;
    setPage(i);
  };

  useEffect(() => {
    getModules();
  }, [page,props.type]);

  useEffect(() => {
    setPage(0);
    getLength();
  }, [props.type]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-10/12">
        <ModulesData modules={modules} />
      </div>
      {array?.length ? (
        <nav className="flex items-center justify-center gap-4">
          {array?.map((v, i) => (
            <button
              key={i}
              className={`${page === i ? "text-blue-400" : ""} text-lg`}
              onClick={() => navigatePages(i)}
            >
              {i}
            </button>
          ))}
        </nav>
      ) : null}
    </div>
  );
};
