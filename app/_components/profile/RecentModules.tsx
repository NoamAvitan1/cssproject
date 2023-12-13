import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { Database } from "@/types/supabase";
import { Module } from "@/app/_module/Module";
import { GoArrowRight } from "react-icons/go";


type ModuleType = Database["public"]["Tables"]["module"]["Row"];
type Props = {
  user_name:string | null | undefined;
};

export const RecentModules = (props: Props) => {
  const router = useRouter();
  const params = useParams();
  const supabase = createClientComponentClient();
  const [modules, setModules] = useState<ModuleType[] | null>(null);

  const updateModules = async () => {
    let { data, error } = await supabase
      .from("module")
      .select(`*, user_id(*)`)
      .eq("user_id", params.id)
      .range(0, 2);
    setModules(data);
    // console.log(data);
  };

  useEffect(() => {
    updateModules();
  }, []);
  return (
    modules?.length ? (
      <div className="w-full flex flex-col gap-3 mt-4">
        <h1 className="border-b-2 border-text text-[17px] md:text-2xl ">
          Recent Modules by {props.user_name}
        </h1>
        <section className="mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {modules?.map((module, i) => (
                <article
                  className="relative aspect-square overflow-hidden rounded-md bg-secondary p-2"
                  key={i}
                >
                  <header className="flex w-full items-center justify-between">
                    <p className="text-xl">{module.title}</p>
                    <Module module={module} />
                  </header>
                </article>
              ))}
        </section>
        {modules?.length >= 3 ? <div className="flex justify-end">
          <section></section>
          <button onClick={()=>router.push(`/profile/id/${params.id}/user-modules`)} className="flex items-center border-b-2 gap-2">
          <span className="text-2xl">show all modules</span>
          <GoArrowRight className="text-xl mt-1"/>
          </button>
        </div> : null}
      </div>
    ) : null
  );
};
