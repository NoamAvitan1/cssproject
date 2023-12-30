"use client";
import { useEffect, useState } from "react";
import { Modal } from "../_components/common/Modal";
import { HiEye } from "react-icons/hi2";
import { ModulesType } from "@/types/Modules";
import {htmlToImage} from '../../utils/html-to-image'

// interface BufferObject {
//   type: "Buffer";
//   data: number[];
// }

interface ImageProps {
  url: string;
  w:number;
  h:number;
}

type Props = {
  module: ModulesType;
};

export const SingleModuleImages = ({module}: Props) => {
  const [images, setImages] = useState<ImageProps[] | null>();
  const [openImage, setOpenImage] = useState<number | null>(null);

  // const getImages = (sources: BufferObject[]) => {
  //   const imageUrls: string[] = [];
  //   for (let i = 0; i < sources.length; i++) {
  //     const uint8Array = new Uint8Array(sources[i].data);
  //     const imageBlob = new Blob([uint8Array], { type: "image/png" });
  //     const imageUrl = URL.createObjectURL(imageBlob);
  //     imageUrls.push(imageUrl);
  //   }
  //   setImages(imageUrls);
  // };

  useEffect(() => {
    const getImages = async() => {
      if(!module?.id || !module?.html?.length || !module?.css) return;
      const imageProps = await Promise.all(module?.html.map((html) => htmlToImage(html,module?.css)))
      console.log(imageProps);
      setImages(imageProps)
    }
    getImages();
  }, [module]);

  return (
    <section>
      <Modal
        isOpen={openImage != null ? true : false}
        setIsOpen={(bool: boolean) => {
          setOpenImage(null);
        }}
      >
        {images && (
          <img src={openImage != null ? images[openImage].url : undefined} />
        )}
      </Modal>
      {/* <h1 className="w-full border-b border-text text-2xl my-3">Examples</h1> */}
      <div className="w-full rounded-full border bg-text p-px mb-2"></div>
      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
        {images &&
          images?.map((img, i) => (
            <button
              key={i}
              onClick={() => setOpenImage(i)}
              className="relative overflow-clip rounded shadow"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-25 duration-300 hover:opacity-50">
                <HiEye className="text-5xl" />
              </div>
              <img key={i} src={img.url} />
            </button>
          ))}
      </div>
    </section>
  );
};
