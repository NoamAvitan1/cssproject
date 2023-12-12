import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSetQuery } from "../_hooks/useSetQuery";

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
  console.log(page);
  useEffect(() => {
    const getProfile = async () => {
      if (query === null) return;
      const { data, error } = await supabase
        .from("profile")
        .select("user_name,id")
        .textSearch("user_name", query)
        .range((page * 9), (page*9)+9);
        if(!data) return;
      setProfiles((prev)=>[...prev,...data]);
    };
    getProfile();
  }, [query,page]);
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
      <button onClick={()=>useSetQuery('up',`${page+1}`)}>Click me</button>
    </div>
  );
};
