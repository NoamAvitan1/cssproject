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
    <div className="flex w-full">
      <div className="w-1/3">
        {props.a}
      </div>
      <div className="w-1/3 bg-slate-500">
        {props.b}
      </div>
      <div className="w-1/3 bg-slate-700">
        {props.c}
      </div>
    </div>
  );
};
