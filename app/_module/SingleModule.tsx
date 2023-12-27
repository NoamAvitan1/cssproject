import { cookies } from "next/headers";
import { SingleModuleImages } from "./SingleModuleImages";
import { HiLockClosed } from "react-icons/hi2";
import { SingleModuleCode } from "./SingleModuleCode";
import { SingleModuleHeader } from "./SingleModuleHeader";
import ServerClient from "@/supabase/ServerClient";
const htmlToImage = require("../../utils/htmlToImage");

type Props = {
  id: string;
};

export default async function SingleModule(props: Props) {
  const images: Buffer[] = [];

  const { data: modulesArray }: any = await ServerClient()
    .from("module")
    .select("*")
    .eq("id", props.id);
  const module = modulesArray[0];
  for (let i = 0; i < module.html.length; i++) {
    const imageBinary = await htmlToImage(module.html[i], module.css);
    if (!imageBinary || typeof imageBinary === "number") return;
    images.push(imageBinary);
  }

  return (
    <article className="flex w-full flex-col items-center gap-6 p-3" id="app">
      <SingleModuleHeader module={module} />
      <SingleModuleCode module={module} />
      <SingleModuleImages imageBuffers={JSON.stringify(images)} />
    </article>
  );
}
