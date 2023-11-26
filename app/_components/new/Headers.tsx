import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { CodeBlock } from "@/types/CodeBlock";
import { HiOutlinePlus } from "react-icons/hi2";
import { DiHtml5 } from "react-icons/di";
import { FaRegSquarePlus } from "react-icons/fa6";

type Props = {
  codeBlocks: Array<CodeBlock>;
  setCodeBlocks: Function;
  selectedBlock: number;
  setSelectedBlock: Function;
};

export const Headers = (props: Props) => {
  const handleClick = () => {
    props.setCodeBlocks((prev: Array<CodeBlock>) =>
      prev.length >= 5 ? prev : [...prev, new CodeBlock("", "html")],
    );
  };

  return (
    <header className="flex bg-slate-500 items-center space-x-px border-b border-primary">
      {props.codeBlocks.map((c, i) => (
        <button
          onClick={() => props.codeBlocks.length > 1 && props.setSelectedBlock(i)}
          key={i}
          className={`relative ${props.selectedBlock == i && props.codeBlocks.length > 1 && "opacity-70"}`}
        >
          <FileTypeHeader
            type={c.type}
            customName={
              props.codeBlocks.length > 1 && props.codeBlocks[i].type != "css"
                ? ""
                : undefined
            }
          />
          <div
            className={`absolute inset-0 flex items-center justify-center bg-background bg-opacity-80 opacity-0 duration-150 ${
              i != props.selectedBlock && "hover:opacity-100"
            }`}
          >
            {i + 1}
          </div>
        </button>
      ))}
      <button
        onClick={handleClick}
        title="New example"
        className={`flex aspect-square h-full items-center justify-center bg-slate-500 duration-150 hover:text-red-500 ${
          (props.codeBlocks[0].type == "css" &&
            (props.codeBlocks.length == 1 || props.codeBlocks.length >= 5)) ||
          (props.codeBlocks[0].type == "html" &&
            props.codeBlocks.length >= 4 &&
            "hidden")
        }`}
      >
        <HiOutlinePlus className="" />
      </button>
    </header>
  );
};
