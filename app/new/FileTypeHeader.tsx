import { useState } from "react";
import { DiCss3, DiHtml5, DiJavascript } from "react-icons/di";

type Props = {
  type: string;
};

export const FileTypeHeader = (props: Props) => {
  const [dragging, setDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const typeIcons = {
    css: {
      icon: <DiCss3 className="font-pixelify text-xl text-sky-500" />,
      fileName: "main.css",
    },
    html: {
      icon: <DiHtml5 className="text-xl text-red-500" />,
      fileName: "demo.html",
    },
    js: {
      icon: <DiJavascript className="text-xl" />,
      fileName: "script.js",
    },
  };

  const element = typeIcons[props.type as "css" | "html" | "js"];

  const handleDrag = (e: React.DragEvent<HTMLElement>) => {
    console.log(e);
    setDragging(true);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    setDragging(false);
  };

  const handleDragOver = () => {
    setIsHovered(true);
  };

  const handleDragLeave = () => {
    setIsHovered(false);
  };

  return (
    <header
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`gap-2 bg-secondary px-2 font-pixelify`}
    >
      <div
        draggable
        onDragCapture={handleDrag}
        onDragEnd={handleDragEnd}
        className={`flex w-fit items-center ${isHovered && 'border-r border-dashed border-slate-500'}`}
      >
        {element.icon}
        <p className="p-2 text-sm">{element.fileName}</p>
      </div>
    </header>
  );
};
