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
  const [img, setImg] = useState<HTMLImageElement[]>();
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
      if (!data) tell("Module not found");
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
      setImg(imgElement);
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
    <div className="flex justify-center items-center w-full h-full" id="app">
      {img && img.map((image, i) => <img src={image.src} alt="" />)}
    </div>
  );
};
