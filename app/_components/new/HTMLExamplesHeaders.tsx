import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { useEffect } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { Menu } from "../common/Menu";

type Props = {
  htmlExamples: Array<string>;
  setHtmlExamples: (newExamples: Array<string>) => void;
  selected: number;
  setSelected: (index: number) => void;
};

export const HTMLExamplesHeaders = (props: Props) => {
  const addExample = () => {
    if (props.htmlExamples.length >= 4) return;
    props.setHtmlExamples([...props.htmlExamples, ""]);
  };

  return (
    <div className="flex items-center space-x-px overflow-x-auto overflow-y-hidden">
      <button className={`duration-75 lg:hidden`}>
        <FileTypeHeader type="css" />
      </button>
      {props.htmlExamples.map((_, i) => (
        <button
          onClick={() => props.setSelected(i)}
          className={`flex items-center bg-secondary duration-75 ${props.selected == i && "opacity-75"}`}
        >
          <FileTypeHeader type="html" customName={"example " + (i + 1)} />
          <div className="hover:text-black">
            <HiEllipsisVertical />
            <Menu isOpen={true} onSelect={() => {}} values={["copy content", "delete"]} />
          </div>
        </button>
      ))}
      <button
        onClick={addExample}
        className="whitespace-pre bg-secondary p-1 px-3 min-h-full duration-75 hover:opacity-75"
      >
        +
      </button>
    </div>
  );
};
