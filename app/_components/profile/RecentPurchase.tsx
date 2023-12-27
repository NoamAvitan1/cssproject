"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { ModulesData } from "@/app/_module/ModulesData";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";
import { ModulesPurchased, ModulesType } from "@/types/Modules";

type Props = {};

export const RecentPurchase = (props: Props) => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useAtom(userAtom);
  const supabase = createClientComponentClient();
  const [modules, setModules] = useState<ModulesPurchased[] | null>(null);

  const getModules = async () => {
    let { data, error } = await supabase
      .from("module_purchase")
      .select(
        "module_id(examples_count,access_type,created_at,description,downloads,id,price,title,title_description,user_id(id,user_name,profile_pic))",
      )
      .eq("user_id", id)
      .range(0, 2);
    setModules(data);
  };
  useEffect(() => {
    getModules();
  }, []);
  return modules && user?.id === id ? (
    <div className="mt-4 flex w-full flex-col gap-6">
      <h1 className="border-b-2 border-text text-[17px] md:text-2xl ">
        Modules purchased
      </h1>
      <div className="flex w-full justify-center">
        <ModulesData
          modules={modules.map((module) => module.module_id)}
          enableEdit={true}
        />
      </div>
      {modules?.length >= 3 ? (
        <div className="flex justify-end">
          <section></section>
          <button
            onClick={() =>
              router.push(
                `/profile/id/${id}/user-modules?modules=purchased-modules`,
              )
            }
            className="flex items-center gap-2 border-b border-b-blue-500 px-1"
          >
            <span className="">Show all purchased modules</span>
            <GoArrowRight className="mt-1" />
          </button>
        </div>
      ) : null}
    </div>
  ) : (
    <div className="my-6 flex h-[200px] items-center justify-center border border-secondary">
        <h1 className="text-2xl">No purchased modules found</h1>
    </div>
  );
};
