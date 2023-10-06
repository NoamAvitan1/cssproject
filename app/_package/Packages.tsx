import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = {};

export default async function Packages(props: Props) {
  const supabase = createServerComponentClient({ cookies });

  let { data: packages, error } = await supabase.from("package").select(`
  *,
  package_module_join (
    *
  )
`);

  console.log(packages);

  return (
    <div className="w-10/12 space-y-6">
      <h1 className="border-b-2 text-2xl w-full">
        Popular Packages to Check Out
      </h1>
      <section className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10">
        {packages
          ? packages.map((v, i) => (
              <article
                className="bg-secondary p-2 rounded-md aspect-square "
                key={i}
              >
                {/* {v.title} */}
              </article>
            ))
          : null}
      </section>
    </div>
  );
}
