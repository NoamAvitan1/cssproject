import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = {};

export default async function Packages(props: Props) {
  const supabase = createServerComponentClient({ cookies });

  const {data:packages} = await supabase.from("package").select(`
  *,
  module(*)`);

  return (
    <div className='w-10/12 space-y-6'>
    <h1 className="border-b-2 border-text text-[19px] xs:text-[17px] md:text-2xl w-full">Popular Packages to Check Out</h1>
    <section className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10">
      {packages? packages.map((v, i) => (
        <article className="bg-secondary overflow-hidden p-2 rounded-md aspect-square relative" key={i}>
           <header className="w-full flex justify-between items-center">
               <p className="text-xl">
                    {v.title}
                </p>
           </header>
        </article>
      )) : null}
    </section>
</div>
  );
}
