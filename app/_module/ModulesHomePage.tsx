import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ModulesData } from "./ModulesData";

type Props = {};

export default async function ModulesHomePage(props: Props) {
  const supabase = createServerComponentClient({ cookies });

  const query = async (type: string = "") => {
    const supabaseQuery = supabase
      .from("module")
      .select(
        "examples_count,access_type,created_at,description,downloads,id,price,title,title_description,user_id(id,user_name,profile_pic)",
      )
      .neq("access_type", "private");
    if (type !== "") {
      supabaseQuery
        .eq("access_type", type)
        .order("downloads", { ascending: false });
    }
    const { data } = await supabaseQuery.range(0, 100).limit(3);
    return data;
  };

  const types = ["public", "paid", ""];
  const promises = types.map((type) => query(type));
  const [free, paid, random] = await Promise.all(promises);

  return (
    <div className="w-10/12 [&_h1]:border-b [&_h1]:border-text [&_h1]:p-2 space-y-6 [&_h1]:text-lg">
      <h1>Public modules</h1>
      <ModulesData modules={free} />
      <h1>Paid modules</h1>
      <ModulesData modules={paid} />
      <h1>Global modules</h1>
      <ModulesData modules={random} />
    </div>
  );
}
