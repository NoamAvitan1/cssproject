import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { Database } from "@/types/supabase";
import { MenuModule } from "@/app/_module/MenuModule";
 
type Module = Database["public"]["Tables"]["module"]["Row"];
type Props = {};

export const RecentModules = (props: Props) => {
  const params = useParams();
  const supabase = createClientComponentClient();
  const [modules,setModules] = useState<any[] | null>(null)

  const updateModules = async () => {
    let { data, error } = await supabase
      .from("module")
      .select(`*, user_id(*)`)
      .eq("user_id", params.id)
      .range(0, 2);
      setModules(data)
      // console.log(data);
  };

  useEffect(() => {
    updateModules();
  }, []);
  return ( modules?.length ? <div className="w-full">
    <h1 className="border-b-2 border-text text-[17px] md:text-2xl ">Recent Modules by {modules?.[0]?.user_id?.user_name}</h1>
    <section className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
       {modules ? modules.map((v, i) => (
                <article className="bg-secondary overflow-hidden p-2 rounded-md aspect-square relative" key={i}>
                   <header className="w-full flex justify-between items-center">
                       <p className="text-xl">
                            {v.title}
                        </p>
                        <MenuModule modules = {v}/>
                   </header>
                </article>
              )) : null}
    </section>
  </div> : null);
};
