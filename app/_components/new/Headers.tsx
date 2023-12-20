import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { CodeBlock } from "@/types/CodeBlock";
import { HiOutlinePlus } from "react-icons/hi2";
import { useState } from "react";
import { HeaderOptions } from "./HeaderOptions";

type Props = {
  codeBlocks: Array<CodeBlock>;
  setCodeBlocks: Function;
  selectedBlock: number;
  setSelectedBlock: Function;
};

export const Headers = (props: Props) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleCopy = async (i: number) => {
    const text = props.codeBlocks[i].code;
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch (error) {
    }
  };

  const handleDelete = (i: number) => {
    if (i == 0) return;
    if (i >= props.codeBlocks.length) props.setSelectedBlock(i - 1)
    const index = props.codeBlocks[0].type == "css" ? i : i + 1;
    props.setCodeBlocks((prev: CodeBlock[]) => {
      const newBlocks = prev.filter((c, ci) => ci != index);
      // console.log(newBlocks)
      return newBlocks;
      // return prev
    });
  };

  const handleRename = (name: string, i: number) => {
    const index = props.codeBlocks[0].type == "css" ? i : i + 1;
    props.setCodeBlocks((prev: CodeBlock[]) => {
      const newBlocks = prev.map((c, i) =>
        i == index ? { ...c, name: name } : c,
      );
      return newBlocks;
    });
  };

  const handleClick = () => {
    props.setCodeBlocks((prev: Array<CodeBlock>) =>
      prev.length >= 5 ? prev : [...prev, new CodeBlock("", "html")],
    );
  };

  return (
    <header className="flex items-center space-x-px bg-secondary">
      {props.codeBlocks.map((c, i) => (
        <button
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(hovered == i ? null : hovered)}
          onClick={() =>
            props.codeBlocks.length > 1 && props.setSelectedBlock(i)
          }
          key={i}
          className="relative"
        >
          <div
            className={`${
              props.selectedBlock == i &&
              props.codeBlocks.length > 1 &&
              "opacity-70"
            }`}
          >
            <FileTypeHeader
              type={c.type}
              customName={c.type == "css" ? "index" : "demo"}
            />
          </div>
          {hovered == i && props.selectedBlock == i && (
            <HeaderOptions
              index={i}
              handleCopy={() => handleCopy(i)}
              // handleRename={(name: string) => handleRename(name, i)}
              handleDelete={() => handleDelete(i)}
            />
          )}
        </button>
      ))}
      <button
        onClick={handleClick}
        title="New example"
        className={`flex aspect-square h-full items-center justify-center duration-150 hover:text-red-500 ${
          (props.codeBlocks[0].type === "css" &&
            (props.codeBlocks.length === 1 || props.codeBlocks.length >= 5)) ||
          (props.codeBlocks[0].type === "html" && props.codeBlocks.length >= 4)
            ? "hidden"
            : ""
        }`}
      >
        <HiOutlinePlus className="" />
      </button>
    </header>
  );
};
