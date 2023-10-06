import { DiCss3, DiHtml5, DiJavascript } from "react-icons/di";

type Props = {
  type: string;
};

export const FileTypeHeader = (props: Props) => {
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

  return (
    <header className="font-pixelify flex items-center gap-2 bg-secondary p-2">
      {element.icon}
      <p className="text-sm">{element.fileName}</p>
    </header>
  );
};
