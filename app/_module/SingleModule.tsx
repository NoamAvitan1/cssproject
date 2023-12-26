import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { SingleModuleImages } from "./SingleModuleImages";
import { HiLockClosed } from "react-icons/hi2";
import { SingleModuleCode } from "./SingleModuleCode";
import { SingleModuleHeader } from "./SingleModuleHeader";
const htmlToImage = require("../../utils/htmlToImage");

type Props = {
  id: string;
};

export default async function SingleModule(props: Props) {
  const supabase = createServerComponentClient({ cookies });
  const images: Buffer[] = [];

  const { data: modulesArray }: any = await supabase
    .from("module")
    .select("*, user_id(*)")
    .eq("id", props.id);
  const moduleData = modulesArray[0];
  for (let i = 0; i < moduleData.html.length; i++) {
    const imageBinary = await htmlToImage(moduleData.html[i], moduleData.css);
    if (!imageBinary || typeof imageBinary === "number") return;
    images.push(imageBinary);
  }

  return (
    <article className="flex w-full flex-col items-center gap-6 p-3" id="app">
      <SingleModuleHeader module={moduleData} />
      <SingleModuleCode module={moduleData} />
      <SingleModuleImages imageBuffers={JSON.stringify(images)} />
    </article>
  );
}
