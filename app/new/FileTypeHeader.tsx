import { useState } from "react";
import { DiCss3, DiHtml5, DiJavascript } from "react-icons/di";

type Props = {
  type: string;
  customName?: string;
};

export const FileTypeHeader = (props: Props) => {
  // const [dragging, setDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const typeIcons = {
    css: {
      icon: <DiCss3 className="font-pixelify text-xl text-sky-500" />,
      fileName: props.customName ?? "main.css",
    },
    html: {
      icon: <DiHtml5 className="text-xl text-red-500" />,
      fileName: props.customName ?? "demo.html",
    },
    js: {
      icon: <DiJavascript className="text-xl" />,
      fileName: props.customName ?? "script.js",
    },
  };

  const element = typeIcons[props.type as "css" | "html" | "js"];

  return (
    <div
      className={`gap-2 bg-accent px-2 font-pixelify h-8 flex items-center justify-center [&_*]:whitespace-nowrap`}
    >
      <div className={`flex w-fit items-center`}>
        {element.icon}
        {element.fileName && <p className="p-2 text-sm max-sm:text-xs">{element.fileName}</p>}
      </div>
    </div>
  );
};
