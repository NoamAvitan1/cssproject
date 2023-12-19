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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query === null || !query) return;
    setIsLoading(true)
    const getModules = async () => {
      const { data, error } = await supabase
        .from("module")
        .select("title,description,id,created_at,price,user_id(id,user_name)")
        .textSearch("title_description", query)
        .range(page * 9, page * 9 + 8);
      const modules = data as unknown as SearchModule[]
      if (query == prevQuery) {
        if (!data) return;
        setModules((prev) => [...prev, ...modules]);
      } else if (query !== prevQuery) {
        setModules(modules ? modules : []);
      }
      setPrevQuery(query);
      setIsLoading(false)
    };
    getModules();
  }, [query, page]);

  const updateQueryParam = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <ul className="px-2 space-y-6 py-6">
      {modules?.length ? (
        modules?.map((module, i) => (
          <li key={i}>
            <SearchModuleComponent module={module} />
          </li>
        ))
      ) : (
        <p>modules do not found</p>
      )}
      <button onClick={() => modules.length >= 9 && updateQueryParam("mp", `${page + 1}`)}
      className="px-4 py-2 rounded-full bg-secondary hover:ring ring-accent duration-150"
      >
        Load more results
      </button>
    </ul>
  );
};
