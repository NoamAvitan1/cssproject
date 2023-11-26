"use client";
export const revalidate = 0;

import { CodeBlock } from "@/types/CodeBlock";
import { useEffect, useState } from "react";
import { dummyCss, dummyHtml } from "./dummyFiles";
import { HTMLView } from "./HTMLView";
import { EditorsView } from "./EditorsView";
import { Monaco } from "../codeEditor/Monaco";
import { HTMLDebugger } from "../../../utils/HTMLDebugger";
import Api from "@/utils/axios";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = {};

export const NewLayout = (props: Props) => {
  const [isLg, setIsLg] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [codeBlocks, setCodeBlocks] = useState<Array<CodeBlock>>([
    new CodeBlock(dummyCss, "css"),
    new CodeBlock(dummyHtml, "html"),
  ]);

  const handleSubmit = async () => {
    const [css, ...examples] = codeBlocks;
    const payload = { css, examples };
    // console.log("payload: ", payload);
    try {
      const res = await Api.post("new/upload-module", payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // HTMLDebugger(".debug", 100)
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
    <div className="grid h-full w-full grow grid-cols-4 bg-background">
      <article className="col-span-4 h-full lg:col-span-3">
        <section className="h-full w-full space-y-px">
          <div className="flex h-[60%] resize-y overflow-auto gap-px border border-secondary bg-background">
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
            <HTMLView html={codeBlocks[selectedBlock + 1].code} css={codeBlocks[0].code} />
          </div>
        </section>
      </article>
      <article className="hidden w-full grow bg-background p-3 lg:block border-l-[1px] border-l-primary">
        <form action="#" className="flex flex-col gap-4 [&_*]:w-full">
          <div className="space-y-2">
            <label htmlFor="title">Name your module:</label>
            <input
              type="text"
              name="title"
              id=""
              placeholder="Example: ModuleMania"
              className="border-b border- bg-transparent border-text focus:outline-none focus:border-accent p-2"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="container border border-accent text-success py-3"
          >
            SUBMIT
          </button>
        </form>
      </article>
    </div>
  );
};
