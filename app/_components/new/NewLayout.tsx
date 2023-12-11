"use client";
import { CodeBlock } from "@/types/CodeBlock";
import { useEffect, useState } from "react";
import { dummyCss, dummyHtml } from "./dummyFiles";
import { HTMLView } from "./HTMLView";
import { EditorsView } from "./EditorsView";
import { HTMLDebugger } from "../../../utils/HTMLDebugger";
import Api from "@/utils/axios";
import { Wave } from "./Wave";
import { ModuleForm } from "./ModuleForm";
import { ModuleSettings } from "./ModuleSettings";

type Props = {};

export const NewLayout = (props: Props) => {
  const [isXl, setIsXl] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [codeBlocks, setCodeBlocks] = useState<Array<CodeBlock>>([
    new CodeBlock(dummyCss, "css"),
    new CodeBlock(dummyHtml, "html"),
  ]);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const [css, ...examples] = codeBlocks;
  //   const payload = { css, examples };
  //   try {
  //     const res = await Api.post("new/upload-module", payload);
  //     // console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleWaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // const container = document.querySelector("#waves")
    // if (!container) return
    // const {x: offsetLeft, y: offsetTop} = container.getBoundingClientRect()
    // // console.log(boundries)
    // const x = e.clientX - offsetLeft - 140
    // const y = e.clientY - offsetTop - 150
    // const wave = new Wave(x, y);
    // container.appendChild(wave.element);
    // setTimeout(() => {
    //   container.removeChild(wave.element)
    // }, 1800)
  // };
  console.log(selectedBlock, codeBlocks)

  useEffect(() => {
    HTMLDebugger(".debug", 4);
    setIsXl(window.innerWidth >= 1280);
    window.addEventListener("resize", () => {
      setIsXl(window.innerWidth >= 1280);
    });

    return () => {
      window.addEventListener("resize", () => {
        setIsXl(window.innerWidth >= 1280);
      });
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1280 && selectedBlock > codeBlocks.length - 1) {
      setSelectedBlock((prev) => prev - 1);
    }
  }, [isXl]);

  return (
    <div className="flex h-[95vh] w-full border-4 border-secondary bg-background">
      <article className="h-full grow">
        <div className="flex h-[70%] gap-1 overflow-auto border-b border-b-secondary bg-secondary">
          <EditorsView
            lang={isXl || selectedBlock == 0 ? "css" : "html"}
            codeBlocks={isXl ? [codeBlocks[0]] : codeBlocks}
            setCodeBlocks={setCodeBlocks}
            selectedBlock={isXl ? 0 : selectedBlock}
            setSelectedBlock={setSelectedBlock}
          />
          {isXl && (
            <EditorsView
              lang="html"
              codeBlocks={isXl ? [...codeBlocks].slice(1) : codeBlocks}
              setCodeBlocks={setCodeBlocks}
              selectedBlock={selectedBlock}
              setSelectedBlock={setSelectedBlock}
            />
          )}
          <ModuleSettings isOpen={true} codeBlocs={codeBlocks} />
        </div>
        <div className="flex grow flex-col">
          <HTMLView
            html={
              codeBlocks[selectedBlock + (isXl || selectedBlock == 0 ? 1 : 0)]
                .code
            }
            css={codeBlocks[0].code}
          />
        </div>
      </article>
    </div>
  );
};
