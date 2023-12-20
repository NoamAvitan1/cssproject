import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Module } from "./Module";
import { ModulesData } from "./ModulesData";
type Props = {};

export default async function ModulesHomePage(props: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: modules, error } = await supabase
    .from("module")
    .select("*,user_id(id,user_name)");
  
    return (
    <div className="w-10/12">
      <ModulesData modules={modules} />
    </div>
  );
}
