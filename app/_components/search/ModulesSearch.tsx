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
    setIsLoading(true);
    const getModules = async () => {
      let supabaseQuery = supabase
        .from("module")
        .select(
          "title,description,id,created_at,price,user_id(id,user_name,profile_pic)",
        );
      if (!query)
        supabaseQuery = supabaseQuery.textSearch("title_description", query);
      supabaseQuery = supabaseQuery.range(page * 9, page * 9 + 8);
      
      const { data, error } = await supabaseQuery;

      const modules = data as unknown as SearchModule[];
      if (query == prevQuery) {
        if (!data) return;
        setModules((prev) => [...prev, ...modules]);
      } else if (query !== prevQuery) {
        setModules(modules ? modules : []);
      }
      if (query) setPrevQuery(query);
      setIsLoading(false);
    };
    getModules();
  }, [query, page]);

  const updateQueryParam = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <ul className="space-y-6 px-2 py-6">
      {modules?.length ? (
        modules?.map((module, i) => (
          <li key={i}>
            <SearchModuleComponent module={module} />
          </li>
        ))
      ) : (
        <p>modules do not found</p>
      )}
      <button
        onClick={() =>
          modules.length >= 9 && updateQueryParam("mp", `${page + 1}`)
        }
        className="rounded-full bg-secondary px-4 py-2 ring-accent duration-150 hover:ring"
      >
        Load more results
      </button>
    </ul>
  );
};
