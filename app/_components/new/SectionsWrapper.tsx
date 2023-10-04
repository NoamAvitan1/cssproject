"use client";

import { useState } from "react";

type Props = {
  a: React.ReactNode;
  b: React.ReactNode;
  c: React.ReactNode;
};

export const SectionsWrapper = (props: Props) => {
  const [current, setCurrent] = useState<"a" | "b" | "c">("a");
  return (
    <div className="relative grow border border-text overflow-x-hidden">
      <div className="absolute h-full left-0 w-1/2 lg:w-1/3">
        {props.a}
      </div>
      <div className="absolute h-full -right-20 w-1/2 lg:w-1/3 lg:left-1/2 lg:-translate-x-1/2 bg-slate-500">
        {props.b}
      </div>
      <div className="absolute h-full -right-32 w-1/2 lg:w-1/3 bg-slate-700">
        {props.c}
      </div>
    </div>
  );
};
