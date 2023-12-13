import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Module } from "./Module";
type Props = {};

export default async function Modules(props: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: modules, error } = await supabase.from("module").select("*");
  return (
    <div className="w-10/12 space-y-6">
      <h1 className="w-full border-b-2 border-text text-[19px] xs:text-[17px] md:text-2xl">
        Popular Modules to Check Out
      </h1>
      <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules
          ? modules.map((module, i) => (
              <article
                className="relative aspect-square overflow-hidden rounded-md bg-secondary p-2"
                key={i}
              >
                <header className="flex w-full items-center justify-between">
                  <p className="text-xl">{module.title}</p>
                  <Module module={module} />
                </header>
              </article>
            ))
          : null}
      </section>
    </div>
  );
}
