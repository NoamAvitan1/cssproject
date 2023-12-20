"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { HiMiniArrowDown, HiOutlinePhoto, HiUser } from "react-icons/hi2";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { ModuleOverlay } from "./ModuleOverlay";
import { SiAtom } from "react-icons/si";
import { useCheckImg } from "../_hooks/useCheckImg";
import { TbCurrencyDollar } from "react-icons/tb";

type Module = Database["public"]["Tables"]["module"]["Row"];

type Props = {
  index: number;
  module: Module;
};

export const Module = ({ index, module }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string | undefined>();

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    const getImg = async () => {
      const url = `https://ielhefdzhfesqnlbxztn.supabase.co/storage/v1/object/public/profile%20pic/${module.user_id?.id}/${module.user_id?.id}`;
      try {
        const bool = await useCheckImg(url);
        setImgUrl(bool ? url : undefined);
      } catch (error) {}
    };
    getImg();
  }, [module]);

  return (
    <section
      key={index}
      className="rounded-[0.43rem] bg-gradient-to-b from-violet-500 to-sky-500 p-[1px]"
    >
      <div className="flex aspect-square flex-col justify-between overflow-hidden rounded-md bg-secondary">
        <div className="p-2">
          <div className="w-full space-y-2">
            <a
              onClick={(e) => e.stopPropagation()}
              className="flex w-full flex-wrap items-center  gap-3 border-b border-violet-500 py-2"
              href={"/module/" + module.id}
            >
              <SiAtom className="text-xl text-blue-500" />
              <span className="font-bold">{module.title}</span>
            </a>
            <HiOutlineInformationCircle className="text-2xl text-violet-500" />
            <a
              onClick={(e) => e.stopPropagation()}
              className="flex h-6 w-fit items-center rounded-full bg-green-300 px-2 text-slate-700"
              href={"/profile/id/" + module.user_id.id}
            >
              {imgUrl && (
                <img
                  src={imgUrl}
                  className="max-h-[20px] max-w-[20px]"
                  alt=""
                />
              )}
              <h1 className="flex items-center gap-1">
                <HiUser /> {module.user_id.user_name}
              </h1>
            </a>
            <span className="flex h-6 w-fit items-center justify-center rounded-full bg-amber-300 px-2 text-slate-700">
              price: {module.price} <TbCurrencyDollar className="text-lg" />
            </span>
            <span className="flex h-6 w-fit items-center rounded-full bg-rose-300 px-2 text-sm text-slate-700">
              Created at:{" "}
              <span className="whitespace-pre font-thin italic">
                {" " + module.created_at.substring(0, 10)}
              </span>
            </span>
            <span className="flex h-6 w-fit items-center rounded-full bg-violet-400 px-2 text-slate-700">
              description:{" "}
            </span>
            <p className="pl-2 pt-2 text-sm font-bold italic">
              - {module.description}
            </p>
          </div>
        </div>
        {/* <button className="" onClick={handleToggle}>
            {toggle ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </button> */}
        <footer className="flex items-center justify-around bg-blue-500 px-2 py-1 text-alert">
          <span title="downloads" className="flex items-center gap-1">
            <HiMiniArrowDown className="text-lg" />
            {module.downloads}
          </span>
          <span title="examples" className="flex items-center gap-1 text-lg">
            <HiOutlinePhoto />
            {module.html?.length}
          </span>
        </footer>
      </div>
      {/* <div className="relative h-full">
          <ModuleOverlay toggle={toggle} module={module} />
        </div> */}
    </section>
  );
};
