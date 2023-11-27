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

type Props = {};

export const NewLayout = (props: Props) => {
  const [isLg, setIsLg] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [codeBlocks, setCodeBlocks] = useState<Array<CodeBlock>>([
    new CodeBlock(dummyCss, "css"),
    new CodeBlock(dummyHtml, "html"),
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [css, ...examples] = codeBlocks;
    const payload = { css, examples };
    try {
      const res = await Api.post("new/upload-module", payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWaveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
  };

  useEffect(() => {
    HTMLDebugger(".debug", 4);
    setIsLg(window.innerWidth >= 768);
    window.addEventListener("resize", () => {
      setIsLg(window.innerWidth >= 768);
    });
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768 && selectedBlock > codeBlocks.length - 1) {
      setSelectedBlock((prev) => prev - 1);
    }
  }, [isLg]);

  return (
    <div className="box-border grid h-[95vh] w-full grow grid-cols-4 overflow-y-hidden bg-background">
      <article className="col-span-4 h-full lg:col-span-3">
        <section className="h-full w-full space-y-px">
          <div className="flex h-[60%] max-h-[60%] resize-y gap-px overflow-auto bg-background">
            <EditorsView
              codeBlocks={isLg ? [codeBlocks[0]] : codeBlocks}
              setCodeBlocks={setCodeBlocks}
              selectedBlock={isLg ? 0 : selectedBlock}
              setSelectedBlock={setSelectedBlock}
            />
            {isLg && (
              <EditorsView
                codeBlocks={isLg ? [...codeBlocks].slice(1) : codeBlocks}
                setCodeBlocks={setCodeBlocks}
                selectedBlock={selectedBlock}
                setSelectedBlock={setSelectedBlock}
              />
            )}
          </div>
          <div className="flex min-h-[40%] grow flex-col">
            <HTMLView
              html={codeBlocks[selectedBlock + 1].code}
              css={codeBlocks[0].code}
            />
          </div>
        </section>
      </article>
      <article
        onClick={(e) => handleWaveClick(e)}
        id="waves"
        className="hidden w-full grow overflow-clip border-l-[1px] border-l-primary bg-background p-3 lg:block"
      >
        <ModuleForm />
      </article>
    </div>
  );
};
