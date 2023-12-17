"use client";

import Image from "next/image";
import prettierLogo from "../../_assets/prettier.png";
import { prettier } from "../../../utils/prettier";
import { tell } from "../teller/Tale";

type Props = {
  instance: any;
  code: string;
  lang: string;
};

export const PrettierButton = ({ instance, code, lang = "css" }: Props) => {
  // let prettier: any
  // let prettierPlugins: any

  // if (typeof window !== 'undefined') {
  //   // @ts-ignore
  //   prettier = window.prettier, prettierPlugins = window.prettierPlugins
  // }

  const handleClick = async () => {
    try {
      const formatted = await prettier(code, lang);
      instance.setValue(formatted);
    } catch (error) {
      tell("Please make sure your code is properly formatted", "alert");
      return;
    }
  };

  return (
    code &&
    code.length > 3 && (
      <button
        onClick={handleClick}
        title="format code with Prettier"
        className="absolute right-0 flex h-10 w-10 items-center justify-center overflow-hidden bg-gradient-radial from-sky-500 to-violet-300 font-extrabold text-violet-800 opacity-30 duration-300 hover:opacity-100"
      >
        <Image src={prettierLogo} alt="P" />
      </button>
    )
  );
};
