import { useCheckImg } from "@/app/_hooks/useCheckImg";
import { SearchModule } from "@/types/Modules";
import { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi2";
import { TbCurrencyDollar } from "react-icons/tb";

type Props = {
  module: SearchModule;
};

export const SearchModuleComponent = ({ module }: Props) => {
  const [pic, setPic] = useState<string | null>(null);

  useEffect(() => {
    const getPick = async () => {
      const url = `https://ielhefdzhfesqnlbxztn.supabase.co/storage/v1/object/public/profile%20pic/${module.user_id?.id}/${module.user_id?.id}`;
      const bool = await useCheckImg(url);
      if (bool) setPic(url);
    };
  }, [module]);

  return (
    <div className="flex justify-between rounded border-b border-text bg-secondary p-4">
      <div className="space-y-2">
        <div className="flex place-items-baseline gap-2">
          <h1 className="flex h-6 items-center rounded-full bg-sky-300 px-2 text-slate-700">
            title: {module.title}
          </h1>
          <span className="flex h-6 items-center rounded-full bg-rose-300 px-2 text-sm font-thin italic text-slate-700">
            {module.created_at.substring(0, 10)}
          </span>
          <a
            className="flex h-6 items-center rounded-full bg-green-300 px-2 text-slate-700"
            href={"/profile/id/" + module.user_id.id}
          >
            {/* {pic && <img src={pic} alt="" />} */}
            <h1 className="flex items-center gap-1"><HiUser /> {module.user_id.user_name}</h1>
          </a>
          <span className="flex items-center justify-center h-6 bg-amber-300 text-slate-700 rounded-full px-2">
            {module.price} <TbCurrencyDollar className="text-lg" />

          </span>
        </div>
        <span className="h-6 flex items-center text-slate-700 rounded-full px-2 bg-violet-400 w-fit">description: </span>
        <p className="italic font-bold text-sm">{module.description}</p>
      </div>
    </div>
  );
};
