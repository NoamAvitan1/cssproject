"use client";
export const revalidate = 0;

import { CodeBlock } from "@/types/CodeBlock";
import { useEffect, useState } from "react";
import { dummyCss, dummyHtml } from "./dummyFiles";
import { HTMLView } from "./HTMLView";
import { EditorsView } from "./EditorsView";
import { Monaco } from "../codeEditor/Monaco";
import { HTMLDebugger } from "../../../utils/HTMLDebugger";

type Props = {};

export const NewLayout = (props: Props) => {
  const [isLg, setIsLg] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [codeBlocks, setCodeBlocks] = useState<Array<CodeBlock>>([
    new CodeBlock(dummyCss, "css"),
    new CodeBlock(dummyHtml, "html"),
  ]);

  useEffect(() => {
    // HTMLDebugger(".debug", 100)
    setIsLg(window.innerWidth >= 768);
    window.addEventListener("resize", () => {
      setIsLg(window.innerWidth >= 768);
    });
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768 && selectedBlock > codeBlocks.length - 1) {
      setSelectedBlock(prev => prev - 1)
    }
  }, [isLg])

  console.log(codeBlocks);

  return (
    <div className="grid h-full w-full grow grid-cols-4">
      <article className="col-span-4 h-full lg:col-span-3">
        <section className="h-full w-full">
          <div className="flex h-[60%] resize-y overflow-auto">
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
          <div className="h-[40%]">
            <HTMLView html={codeBlocks[1].code} css={codeBlocks[0].code} />
          </div>
        </section>
      </article>
    </div>
  );
};
