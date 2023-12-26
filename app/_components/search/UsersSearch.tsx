import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchProfileComponent } from "./SearchProfileComponent";

interface Profile {
  id: string;
  user_name: string;
  profile_pic?: string;
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
    if (query === null || !query) return;
    setIsLoading(true)
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("user_name,id,profile_pic")
        .textSearch("user_name", query)
        .range(page * 9, page * 9 + 8);
      if (query === prevQuery) {
        if (!data) return;
        setProfiles((prev) => [...prev, ...data]);
      } else if (query !== prevQuery) {
        setProfiles(data ? data : []);
      }
      setPrevQuery(query);
      setIsLoading(false)
    };
    getProfile();
  }, [query, page]);

  const updateQueryParam = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <div>
      {profiles?.length ? (
        <ul className="space-y-4 py-4">
          {profiles?.map((profile, i) => (
            <li key={i}>
              <SearchProfileComponent profile={profile} />
            </li>
          ))}
        </ul>
      ) : (
        <p>users not found</p>
      )}
      <button onClick={() => profiles.length >= 9 && updateQueryParam("up", `${page + 1}`)}>
        Click me
      </button>
    </div>
  );
};
