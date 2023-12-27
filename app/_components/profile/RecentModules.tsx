import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Database } from "@/types/supabase";
import { GoArrowRight } from "react-icons/go";
import { ModulesData } from "@/app/_module/ModulesData";
import { FaHandPointRight } from "react-icons/fa6";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";
import { ModulesType } from "@/types/Modules";

type Props = {
  user_name: string | null | undefined;
};

export const RecentModules = (props: Props) => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useAtom(userAtom);
  const supabase = createClientComponentClient();
  const [modules, setModules] = useState<ModulesType[] | null>(null);

  const getModules = async () => {
    let supabaseQuery = supabase
    .from("module")
    .select('examples_count,access_type,created_at,description,downloads,id,price,title,title_description,user_id(id,user_name)')
    .eq("user_id", id)
    .range(0, 2);
    if(id !== user?.id){
      supabaseQuery.neq('access_type','private')
    }
    let { data, error } = await supabaseQuery
    setModules(data);
  };

  useEffect(() => {
    getModules();
  }, []);
  return modules?.length ? (
    <div className="mt-4 flex w-full flex-col gap-6">
      <h1 className="border-b-2 border-text text-[17px] md:text-2xl ">
        Recent Modules by {props.user_name}
      </h1>
      <div className="flex w-full justify-center">
        <ModulesData modules={modules} enableEdit={true} />
      </div>
      {modules?.length >= 3 ? (
        <div className="flex justify-end">
          <section></section>
          <button
            onClick={() => router.push(`/profile/id/${id}/user-modules?modules=user-modules`)}
            className="flex items-center gap-2 border-b border-b-blue-500 px-1"
          >
            <span className="">Show all modules</span>
            <GoArrowRight className="mt-1" />
          </button>
        </div>
      ) : null}
    </div>
  ) : (
    <div className="my-6 flex h-[200px] items-center justify-center border border-secondary">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-2xl">No recent modules found</h1>
        {user?.id === id && (
          <button
          onClick={() => router.push('/new')}
            className="flex items-center gap-2 border-b border-b-blue-500 px-1"
          >
            Create your first module
            <FaHandPointRight />
          </button>
        )}
      </div>
    </div>
  );
};
