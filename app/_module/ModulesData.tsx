import { Database } from "@/types/supabase";
import { Module } from "./Module";

type Modules = Database["public"]["Tables"]["module"]["Row"];
type Props = {
  modules: Modules[] | null;
};

export const ModulesData = (props: Props) => {
  return (
    <article className="w-full space-y-6">
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {props.modules
          ? props.modules.map((module, i) => (
              <div key={i}>
                <Module module={module} index={i} />
              </div>
            ))
          : null}
      </div>
    </article>
  );
};
