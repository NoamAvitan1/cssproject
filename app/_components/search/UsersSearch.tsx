import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Profile {
  id: string;
  user_name: string;
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

  useEffect(() => {
    const getProfile = async () => {
      if (query === null || !query) return;
      const { data, error } = await supabase
        .from("profile")
        .select("user_name,id")
        .textSearch("user_name", query)
        .range(page * 9, page * 9 + 8);
      if (query === prevQuery) {
        if (!data) return;
        setProfiles((prev) => [...prev, ...data]);
      } else if (query !== prevQuery) {
        setProfiles(data ? data : []);
      }
      setPrevQuery(query);
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
        profiles?.map((profile, i) => (
          <div key={i}>
            <p>{profile?.user_name}</p>
          </div>
        ))
      ) : (
        <p>users not found</p>
      )}
      <button onClick={() => profiles.length >= 9 && updateQueryParam("up", `${page + 1}`)}>
        Click me
      </button>
    </div>
  );
};