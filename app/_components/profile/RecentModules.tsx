import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { Database } from "@/types/supabase";
import { Module } from "@/app/_module/Module";

type Module = Database["public"]["Tables"]["module"]["Row"];
type Props = {};

export const RecentModules = (props: Props) => {
  const params = useParams();
  const supabase = createClientComponentClient();
  const [modules, setModules] = useState<any[] | null>(null);

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
    modules && (
      <div className="w-full">
        <h1 className="border-b-2 border-text text-[17px] md:text-2xl ">
          Recent Modules by {modules?.[0]?.user_id?.user_name}
        </h1>
        <section className="mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {modules
            ? modules.map((v, i) => (
                <article
                  className="relative aspect-square overflow-hidden rounded-md bg-secondary p-2"
                  key={i}
                >
                  <header className="flex w-full items-center justify-between">
                    <p className="text-xl">{v.title}</p>
                    <Module modules={v} />
                  </header>
                </article>
              ))
            : null}
        </section>
      </div>
    )
  );
};
