import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchProfileComponent } from "./SearchProfileComponent";

interface Profile {
  id: string;
  user_name: string;
  profile_pic?: string;
  about: string;
  module_count: number;
}
type Props = {};

export const UsersSearch = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("s");
  const page = Number(searchParams.get("up") || 0);
  const supabase = createClientComponentClient();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [prevQuery, setPrevQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const getProfile = async () => {
      let supabaseQuery = supabase
      .from("profile")
      .select("user_name,id,profile_pic,module_count,about")
      if (query) supabaseQuery.textSearch("user_name", query)
      supabaseQuery.range(page * 9, page * 9 + 8);
      const { data, error } = await supabaseQuery
      if (query === prevQuery) {
        if (!data) return;
        setProfiles((prev) => [...prev, ...data]);
      } else if (query !== prevQuery) {
        setProfiles(data ? data : []);
      }
      if (query) setPrevQuery(query);
      setIsLoading(false);
    };
    getProfile();
  }, [query, page]);

  const updateQueryParam = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div>
      {profiles?.length ? (
        <ul className="grid grid-cols-2 gap-4 py-4 md:grid-cols-3 xl:grid-cols-4">
          {profiles?.map((profile, i) => (
            <li key={i}>
              <SearchProfileComponent profile={profile} />
            </li>
          ))}
        </ul>
      ) : (
        <p>users not found</p>
      )}
      <button
        onClick={() =>
          profiles.length >= 9 && updateQueryParam("up", `${page + 1}`)
        }
        className="rounded-full bg-secondary px-4 py-2 ring-accent duration-150 hover:ring"
      >
        Load more results
      </button>
    </div>
  );
};
