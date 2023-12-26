"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ModulesData } from "@/app/_module/ModulesData";
import { ModulesPurchased, ModulesType } from "@/types/Modules";

type Props = {
  type?: "public" | "paid" | "all";
};

export const UserModules = (props: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("modules");
  const [page, setPage] = useState<number>(0);
  const [modules, setModules] = useState<any[] | null>(null);
  const { id } = useParams();
  const supabase = createClientComponentClient();
  const [array, setArray] = useState<number[]>();

  const getLength = async () => {
    let supabaseQuery;
    if (query === "user-modules") {
      supabaseQuery = supabase
        .from("module")
        .select(
          "examples_count,access_type,created_at,description,downloads,id,price,title,title_description,user_id(id,user_name)",
          { count: "exact", head: true },
        )
        .eq("user_id", id);
      if (props.type !== "all") {
        supabaseQuery.eq("access_type", props.type);
      }
    } else {
      supabaseQuery = supabase
        .from("module_purchase")
        .select(
          "module_id(examples_count,access_type,created_at,description,downloads,id,price,title,title_description,user_id(*))",
        )
        .eq("user_id", id);
    }
    let { count, error } = await supabaseQuery;
    if (count || count === 0) {
      let pages = Math.ceil(count / 9);
      setArray(new Array(pages).fill(0));
    }
  };

  const getModules = async () => {
    let supabaseQuery;
    if (query === "user-modules") {
      supabaseQuery = supabase
        .from("module")
        .select(
          "examples_count,access_type,created_at,description,downloads,id,price,title,title_description,user_id(id,user_name)",
        )
        .eq("user_id", id)
        .range(page * 9, page * 9 + 8);
      if (props.type !== "all") {
        supabaseQuery.eq("access_type", props.type);
      }
    } else {
      supabaseQuery = supabase
        .from("module_purchase")
        .select(
          "module_id(examples_count,access_type,created_at,description,downloads,id,price,title,title_description,user_id(*))",
        )
        .eq("user_id", id)
        .range(page * 9, page * 9 + 8);
    }
    let { data, error } = await supabaseQuery;
    console.log(data);
    setModules(data as ModulesType[] | ModulesPurchased[] | null);
  };

  const navigatePages = (i: number) => {
    if (page === i) return;
    setPage(i);
  };

  useEffect(() => {
    getModules();
  }, [page, props.type]);

  useEffect(() => {
    setPage(0);
    getLength();
  }, [props.type]);

  return (
    modules && (
      <div className="flex w-full flex-col items-center gap-4">
        {query === "user-modules" ? (
          <div className="w-10/12">
            <ModulesData enableEdit={true} modules={modules} />
          </div>
        ) : (
          <div className="w-10/12">
            <ModulesData
              enableEdit={true}
              modules={modules.map((module) => module?.module_id)}
            />
          </div>
        )}

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
    )
  );
};
