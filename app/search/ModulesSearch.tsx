import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Module{
    title:string;
    description:string;
}
type Props = {};

export const ModulesSearch = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const supabase = createClientComponentClient();
  const [modules, setModules] = useState<Module[] | null>(null);
  useEffect(() => {
    const getModules = async () => {
      if (search === null) return;
      const { data, error } = await supabase
        .from("module")
        .select('title,description')
        .textSearch("title_description", search)
        .range(0, 9);
      setModules(data);
    };
    getModules();
  }, [search]);
  return (
    <div>
      {modules?.length ? (
        modules?.map((module, i) => (
          <div key={i}>
            <p>{module?.title}</p>
          </div>
        ))
      ) : (
        <p>modules do not found</p>
      )}
    </div>
  );
};
