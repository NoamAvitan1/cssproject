"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import {
  HiArrowSmallRight,
  HiMiniArrowDown,
  HiOutlinePhoto,
  HiUser,
} from "react-icons/hi2";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { ModuleOverlay } from "./ModuleOverlay";
import { SiAtom } from "react-icons/si";
import { useCheckImg } from "../_hooks/useCheckImg";
import { TbCurrencyDollar } from "react-icons/tb";
import { ModulesType } from "@/types/Modules";
import { userAtom } from "../_jotai/userAtoms";
import { useAtom } from "jotai";
import { MdOutlineEdit } from "react-icons/md";

type Props = {
  index: number;
  module: ModulesType;
  enableEdit?: boolean;
};

export const Module = ({ index, module, enableEdit }: Props) => {
  const [user] = useAtom(userAtom);

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
      <div className="flex aspect-square flex-col justify-between rounded-md bg-secondary">
        <div className="w-full space-y-2">
          <a
            onClick={(e) => e.stopPropagation()}
            className="flex w-full flex-wrap items-center justify-between border-b border-violet-500 p-2"
            href={"/module/" + module.id}
          >
            <div className="flex items-center gap-3">
              <SiAtom className="text-xl text-blue-500" />
              <span className="text-sm">{module.title}</span>
            </div>
            <HiArrowSmallRight className="text-blue-500" />
          </a>
          <div className="flex items-center justify-between pl-2">
            <HiOutlineInformationCircle className="text-2xl text-violet-500" />
            <div className="relative">
              {module.price == 0 && (
                <span className="bg-success px-1 pl-2 text-xs text-slate-800">
                  Free
                </span>
              )}
              {enableEdit && user?.id == module.user_id.id && (
                <a
                  className="absolute right-1 top-[110%] rounded border-2 border-primary bg-accent duration-100 active:scale-95"
                  href={`/new?edit=${module?.id}`}
                >
                  <MdOutlineEdit className="" />
                </a>
              )}
            </div>
          </div>
          <div className="w-full space-y-2 px-2">
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
            {module.price > 0 && (
              <span className="flex h-6 w-fit items-center justify-center rounded-full bg-amber-300 px-2 text-slate-700">
                price: {module.price} <TbCurrencyDollar className="text-lg" />
              </span>
            )}
            <span className="flex h-6 w-fit items-center rounded-full bg-rose-300 px-2 text-sm text-slate-700">
              Created at:{" "}
              <span className="whitespace-pre font-thin italic">
                {" " + module.created_at.substring(0, 10)}
              </span>
            </span>
            <span className="flex h-6 w-fit items-center rounded-full bg-violet-400 px-2 text-slate-700">
              description:{" "}
            </span>
            <a href={`/payment?module_id=${module?.id}&price=${module?.price}&user_id=${module?.user_id.id}`}>buy</a>
            <p className="pl-2 pt-2 text-sm">- {module.description}</p>
          </div>
        </div>
        {/* <button className="" onClick={handleToggle}>
            {toggle ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </button> */}
        <footer className="flex items-center justify-around rounded-b-md bg-blue-500 px-2 py-1 text-alert">
          <span title="downloads" className="flex items-center gap-1">
            <HiMiniArrowDown className="text-lg" />
            {module.downloads}
          </span>
          <span title="examples" className="flex items-center gap-1 text-lg">
            <HiOutlinePhoto />
            {module.examples_count}
          </span>
        </footer>
      </div>
      {/* <div className="relative h-full">
          <ModuleOverlay toggle={toggle} module={module} />
        </div> */}
    </section>
  );
};
