'use client'

import { useEffect, useState } from "react";

type Props = {
imageBuffers: string
};

export const SingleModuleImages = (props: Props) => {
  const [images,setImages] = useState<string[]>()
  const getImages = (sources:string[]) => {
    const img: string[] = []
    for(let i = 0; i < sources.length; i++){
     const imageBlob = new Blob([sources[i]],{type: "image/png"});
     const imageUrl = URL.createObjectURL(imageBlob);
     img.push(imageUrl);
    }
    setImages(img)
  }
  useEffect(() => {
   const sources = JSON.parse(props.imageBuffers);
   getImages(sources);
  },[])
  return (
    <div>
      {images && images?.map((img,i) => (
        <img key={i} src={img}/>
      ))}
    </div>
  );
};
