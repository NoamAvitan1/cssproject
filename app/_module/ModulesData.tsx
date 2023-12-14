import { Database } from "@/types/supabase";
import { Module } from "./Module";

type Modules = Database["public"]["Tables"]["module"]["Row"];
type Props = {
modules:Modules[] | null;
};

export const ModulesData = (props: Props) => {

  return (
     <div className="w-10/12 space-y-6 ">
      <article className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {props.modules
          ? props.modules.map((module, i) => (
              <section
                className="relative aspect-square overflow-hidden rounded-md bg-secondary p-2"
                key={i}
              >
                <header className="flex w-full items-center justify-between">
                  <p className="text-xl">{module.title}</p>
                  <Module module={module} />
                </header>
              </section>
            ))
          : null}
      </article>
    </div>

  );
};
