import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { MenuModule } from './MenuModule';
type Props = {};

export default async function Modules(props: Props) {
    const supabase = createServerComponentClient({ cookies });
        const { data: modules, error } = await supabase.from("module").select("*");

    return (
        <div className='w-10/12 space-y-6'>
            <h1 className="border-b-2 border-text text-2xl w-full">Popular Modules to Check Out</h1>
            <section className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10">
              {modules ? modules.map((v, i) => (
                <article className="bg-secondary overflow-hidden p-2 rounded-md aspect-square relative" key={i}>
                   <header className="w-full flex justify-between items-center">
                       <p className="text-xl">
                            {v.title}
                        </p>
                        <MenuModule modules = {v}/>
                   </header>
                </article>
              )) : null}
            </section>
        </div>
      );
      
};
