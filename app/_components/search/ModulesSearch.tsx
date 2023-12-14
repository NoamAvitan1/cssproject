import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchModuleComponent } from "./SearchModuleComponent";
import { SearchModule } from "@/types/Modules";

type Props = {};

export const ModulesSearch = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("s");
  const page = Number(searchParams.get("mp") || 0);
  const supabase = createClientComponentClient();
  const [modules, setModules] = useState<SearchModule[]>([]);
  const [prevQuery, setPrevQuery] = useState<string>("");

  useEffect(() => {
    if (query === null || !query) return;
    const getModules = async () => {
      const { data, error } = await supabase
        .from("module")
        .select("title,description,id,created_at,price,user_id(id,user_name)")
        .textSearch("title_description", query)
        .range(0, 9);
      const modules = data as unknown as SearchModule[]
      if (query == prevQuery) {
        if (!data) return;
        setModules((prev) => [...prev, ...modules]);
      } else if (query !== prevQuery) {
        setModules(modules ? modules : []);
      }
      setPrevQuery(query);
    };
    getModules();
  }, [query, page]);

  const updateQueryParam = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <div>
      {modules?.length ? (
        modules?.map((module, i) => (
          <div key={i}>
            <SearchModuleComponent module={module} />
          </div>
        ))
      ) : (
        <p>modules do not found</p>
      )}
      <button onClick={() => updateQueryParam("mp", `${page + 1}`)}>
        Click me
      </button>
    </div>
  );
};
