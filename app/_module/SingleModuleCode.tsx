"use client";

import { Database } from "@/types/supabase";
import { useAtom } from "jotai";
import { userAtom } from "../_jotai/userAtoms";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { HiLockClosed } from "react-icons/hi2";
import { IoLogoCss3, IoLogoHtml5 } from "react-icons/io5";

type Module = Database["public"]["Tables"]["module"]["Row"];

type Props = {
  module: Module;
};

export const SingleModuleCode = ({ module }: Props) => {
  const [user] = useAtom(userAtom);
  const [isPurchased, setIsPurchased] = useState(false);

  const supabase = createClientComponentClient();

  const downloadFile = (
    code: string,
    fileName: string,
    type: "css" | "html",
  ) => {
    const blob = new Blob([code], { type: "text/" + type });

    const link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.style.display = "none";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const downloadCSSFile = () => {
    const code = module.css
    downloadFile(code, 'main', 'css')
  }

  const downloadHTMLExamplesFile = () => {
    const HTMLExamples = module.html
    if (!HTMLExamples) return
    let code = ''
    for (let i = 0; i < HTMLExamples.length; i++) {
      code += `//example ${i + 1}\n${HTMLExamples[i]}\n\n`
    }
    downloadFile(code, 'examples', 'html')
  }

  useEffect(() => {
    if (!user || !module) return;
    const getPurchase = async () => {
      const { data } = await supabase
        .from("module_purchase")
        .select("*")
        .eq("module_id", module.id)
        .eq("user_id", user?.id);
      const purchase = data ? data[0] : null;
      if (!purchase) return;
      else if (
        purchase.module_id === module.id &&
        purchase.user_id === user.id
      ) {
        setIsPurchased(true);
      }
    };

    console.log(module);

    if (module.access_type != "paid") setIsPurchased(true);
    else getPurchase();
  }, [module, user]);

  return (
    <div className="">
      {isPurchased ? (
        <div className="flex flex-col gap-2 items-center">
          <button
            onClick={() => downloadCSSFile()}
            className="rounded-full border-2 border-slate-500 bg-secondary px-4 py-1 duration-100 active:scale-95"
          >
            <p className="flex items-center gap-2">
              Download CSS file <IoLogoCss3 className="text-sky-500" />
            </p>
          </button>
          <button
            onClick={() => downloadHTMLExamplesFile()}
            className="rounded-full border-2 border-slate-500 bg-secondary px-4 py-1 duration-100 active:scale-95"
          >
            <p className="flex items-center gap-2">
              Download examples HTML file <IoLogoHtml5 className="text-red-500" />
            </p>
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="rounded-full border-2 border-slate-500 bg-secondary px-4 py-1 duration-100 active:scale-95">
            <p className="flex items-center gap-2">
              Unlock this module <HiLockClosed />
            </p>
          </button>
        </div>
      )}
    </div>
  );
};
