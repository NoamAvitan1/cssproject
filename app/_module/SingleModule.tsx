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
  const [img, setImg] = useState<HTMLImageElement[]>([]);
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
  console.log("d")
  const getImages = async () => {
    console.log(module?.html)
    if (!module?.html) return;
    const imageElements = await Promise.all(
      module.html.map((html) => htmlToImage(html, module.css))
    );
    console.log(imageElements[0].src)
    setImg(imageElements);
  };

  useEffect(() => {
    getImages();
  }, [module]);

  useEffect(() => {
    getModule();
  }, []);


  return (
    // <div>
    //   {img.map((imgElement, index) => (
    //     <div key={index}>
    //       <img src={imgElement.src} alt={`Image ${index}`} />
    //     </div>
    //   ))}
    // </div>
    <>adsdsa</>
  );
};
