"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { useState } from "react";
import { LuImage } from "react-icons/lu";
import { tell } from "../teller/Tale";

type Props = {
  imageUrl:string | null;
  setImageUrl:Function;
  setIsOpen:Function;
};

export const Bucket = (props: Props) => {
    const [user, setUser] = useAtom(userAtom);
    const [blobUrl,setBlobUrl] = useState<string>();
    const supabase = createClientComponentClient();
    const [imageFile,setImageFile] = useState<File | null>(null)
  
  const updateFile = async () => {
    if(!imageFile) return;
    const { data, error } = await supabase.storage
      .from("profile pic")
      .upload(`${user?.id}/${user?.id}`, imageFile, {
        cacheControl: "3600",
        upsert: true, 
      });
      props.setImageUrl(blobUrl);
      props.setIsOpen(false);
      tell("Picture changed seccesfully",'success')
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      if(!e?.target?.files?.length || !e.target.files[0]) return;
      const img = e.target.files[0];
      setImageFile(img);
      const blob = new Blob([img], { type: "image/png"})
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
  }

  return (
      <div className="">
        <div className="">
          {blobUrl ? <img className="" src={blobUrl} alt="" />
           : <LuImage className=""/>}
        </div>
        <div className="">
          <div className="">
          <input className="" onChange={(e)=>handleChange(e)} type="file" />
          <button  className="">Choose a file</button>
          </div>
          <button onClick={() => updateFile()} className="">save</button>
        </div>
      </div>
  );
};
