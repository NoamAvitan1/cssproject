'use client'

import { useState } from "react";

type Props = {
    instance: any
    code: string
};


export const PrettierButton = ({ instance, code }: Props) => {
  
  const [isHovered, setIsHovered] = useState(false) 
  
  // @ts-ignore
  const prettier = window.prettier, prettierPlugins = window.prettierPlugins
  
  const handleClick = async () => {
    const formatted = await prettier.format(code, {
      parser: "css",
      plugins: prettierPlugins,
    });
    instance.setValue(formatted)
  }

  return (
    <button onClick={handleClick} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}
    className="font-extrabold flex items-center">
        <p>P</p>
        <div className={`${isHovered ? 'w-[50px]' : 'w-0'} overflow-hidden duration-1000`}>
          <p>Y</p>
          <p>X</p>
        </div>
    </button>
  );
};
