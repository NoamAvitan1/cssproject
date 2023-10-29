"use client";

import { useState } from "react";
import { DragItem } from "./DragItem";

//@ts-nocheck
type Props = {};

export const Test = (props: Props) => {
  const sections = useState({
    a: [<p className="w-full h-full">0</p>],
    b: [],
    c: [<p className="w-full h-full">1</p>],
    d: [],
  })

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="grow w-full flex flex-col p-4">
      <div className="z-10 grow w-full flex flex-wrap">
        <div className={`w-1/2 grow bg-slate-500 col-span-full row-span-full border border-blue-500`}>1</div>
        <div className={`w-1/2 grow bg-slate-500 col-span-full row-span-full border border-yellow-500`}>2</div>
        <div className={`w-1/2 grow bg-slate-500 col-span-full row-span-full border border-green-500`}>3</div>
        <div className={`w-1/2 grow bg-slate-500 col-span-full row-span-full border border-red-500`}>4</div>
      </div>
    </div>
  )
};
