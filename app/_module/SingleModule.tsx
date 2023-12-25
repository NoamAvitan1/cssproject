import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { SingleModuleImages } from "./SingleModuleImages";
const htmlToImage =  require("../../utils/htmlToImage");

type Props = {
  id: string;
};

export default async function SingleModule(props: Props) {
  const supabase = createServerComponentClient({ cookies });
  const images: Buffer[] = [];

  const { data }: any = await supabase.from("module").select("*").eq("id", props.id);
  const moduleData = data[0];
  for (let i = 0; i < moduleData.html.length; i++) {
    const imageBinary = await htmlToImage(moduleData.html[i], moduleData.css);
    if(!imageBinary || typeof imageBinary === 'number') return;
    images.push(imageBinary);
  }

  return (
    <article
      className="flex h-full w-full items-center justify-center"
      id="app"
    >
      <div className="container grid max-w-[1000px] gap-4 p-4 md:grid-cols-2">
        <SingleModuleImages imageBuffers={JSON.stringify(images)}/>
      </div>
    </article>
  );
}