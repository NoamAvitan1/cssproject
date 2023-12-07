'use client'

import Image from "next/image";
import prettierLogo from '../../_assets/prettier.png'

type Props = {
    instance: any
    code: string
    lang: string
};


export const PrettierButton = ({ instance, code, lang = "css" }: Props) => {
    
  let prettier: any
  let prettierPlugins: any
  
  if (typeof window !== 'undefined') {
    // @ts-ignore
    prettier = window.prettier, prettierPlugins = window.prettierPlugins
  }
  
  const handleClick = async () => {
    const formatted = await prettier.format(code, {
      parser: lang,
      plugins: prettierPlugins,
    });
    instance.setValue(formatted)
  }  

  return (
    code && code.length > 3 && <button onClick={handleClick} title="format code with Prettier"
    className="font-extrabold flex justify-center w-10 h-10 overflow-hidden absolute right-0 items-center bg-gradient-radial text-violet-800 from-sky-500 to-violet-300 opacity-30 hover:opacity-100 duration-300">
        <Image src={prettierLogo} alt="P" />
    </button>
  );
};
