"use client";
import { useEffect, useState } from "react";

interface BufferObject {
  type: 'Buffer';
  data: number[];
}

type Props = {
  imageBuffers: string;
};

export const SingleModuleImages = (props: Props) => {
  const [images, setImages] = useState<string[]>();
  const getImages = (sources: BufferObject[]) => {
    const imageUrls: string[] = [];
    for (let i = 0; i < sources.length; i++) {
      const uint8Array = new Uint8Array(sources[i].data);
      const imageBlob = new Blob([uint8Array], { type: "image/png" });
      const imageUrl = URL.createObjectURL(imageBlob);
      imageUrls.push(imageUrl);
    }
    setImages(imageUrls);
  };
  useEffect(() => {
    const sources = JSON.parse(props.imageBuffers);
    getImages(sources);
  }, []);
  return (
    <div>{images && images?.map((img, i) => <img key={i} src={img} />)}</div>
  );
};
