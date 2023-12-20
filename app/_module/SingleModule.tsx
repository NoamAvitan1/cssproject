"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { tell } from "../_components/teller/Tale";
import { Database } from "@/types/supabase";
import { htmlToImage } from "../../utils/htmlToImage";

type Module = Database["public"]["Tables"]["module"]["Row"];
type Props = {};

export const SingleModule = (props: Props) => {
  const [module, SetModule] = useState<Module | null>();
  const [examples, setExamples] = useState<HTMLImageElement[]>();
  const supabase = createClientComponentClient();
  const { id } = useParams();
  const getModule = async () => {
    if (!id) return;
    try {
      const { data, error } = await supabase
        .from("module")
        .select("*")
        .eq("id", id);
      SetModule(data && data[0]);
      if (!data) tell("Module not found",'alert');
    } catch (error) {
      tell("Error loading module", "error");
    }
  };

  const getImages = async () => {
    if (!module?.html) return;
    try {
      const imgElement: HTMLImageElement[] = [];
      for (let i = 0; i < module?.html.length; i++) {
        const image = await htmlToImage(module?.html[i], module?.css);
        imgElement.push(image);
      }
      setExamples(imgElement);
    } catch (error) {
      console.error("Error converting HTML to image:", error);
    }
  };

  useEffect(() => {
    getImages();
  }, [module]);

  useEffect(() => {
    getModule();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center !text-white" id="app">
      {examples && examples.map((image, i) => <img key={i} src={image.src} alt="" />)}
    </div>
  );
};
