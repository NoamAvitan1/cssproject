import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Database } from "@/types/supabase";
import { GoArrowRight } from "react-icons/go";
import { ModulesData } from "@/app/_module/ModulesData";
import { FaHandPointRight } from "react-icons/fa6";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";

type ModuleType = Database["public"]["Tables"]["module"]["Row"];
type Props = {
  user_name: string | null | undefined;
};

export const RecentModules = (props: Props) => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useAtom(userAtom);
  const supabase = createClientComponentClient();
  const [modules, setModules] = useState<ModuleType[] | null>(null);

  const updateModules = async () => {
    let { data, error } = await supabase
      .from("module")
      .select(`*, user_id(id,user_name)`)
      .eq("user_id", id)
      .range(0, 2);
    setModules(data);
  };

  useEffect(() => {
    updateModules();
  }, []);
  return modules?.length ? (
    <div className="mt-4 flex w-full flex-col gap-6">
      <h1 className="border-b-2 border-text text-[17px] md:text-2xl ">
        Recent Modules by {props.user_name}
      </h1>
      <div className="flex w-full justify-center">
        <ModulesData modules={modules} />
      </div>
      {modules?.length >= 3 ? (
        <div className="flex justify-end">
          <section></section>
          <button
            onClick={() => router.push(`/profile/id/${id}/user-modules`)}
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
          <a
            className="flex items-center gap-2 border-b border-b-blue-500 px-1"
            href="/new"
          >
            Create your first module
            <FaHandPointRight />
          </a>
        )}
      </div>
    </div>
  );
};
