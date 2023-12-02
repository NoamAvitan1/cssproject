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
  const [isXl, setIsXl] = useState<boolean>(false);
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
    setIsXl(window.innerWidth >= 1280);
    window.addEventListener("resize", () => {
      setIsXl(window.innerWidth >= 1280);
    });

    return () => {
      window.addEventListener("resize", () => {
        setIsXl(window.innerWidth >= 1280);
      });
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1280 && selectedBlock > codeBlocks.length - 1) {
      setSelectedBlock((prev) => prev - 1);
    }
  }, [isXl]);

  return (
    <div className="box-border flex h-[95vh] w-full bg-background">
      <article className="grow h-full xl:col-span-3 overflow-y-hidden">
        <section className="h-full w-full space-y-px">
          <div className="flex h-[60%] max-h-[60%] resize-y gap-px overflow-auto bg-background">
            <EditorsView
              lang={(isXl || selectedBlock == 0) ? 'css' : 'html'}
              codeBlocks={isXl ? [codeBlocks[0]] : codeBlocks}
              setCodeBlocks={setCodeBlocks}
              selectedBlock={isXl ? 0 : selectedBlock}
              setSelectedBlock={setSelectedBlock}
            />
            {isXl && (
              <EditorsView
                lang='html'
                codeBlocks={isXl ? [...codeBlocks].slice(1) : codeBlocks}
                setCodeBlocks={setCodeBlocks}
                selectedBlock={selectedBlock}
                setSelectedBlock={setSelectedBlock}
              />
            )}
          </div>
          <div className="flex min-h-[40%] grow flex-col">
            <HTMLView
              html={codeBlocks[selectedBlock + ((isXl || selectedBlock == 0) ? 1 : 0)].code}
              css={codeBlocks[0].code}
            />
          </div>
        </section>
      </article>
      <article
        onClick={(e) => handleWaveClick(e)}
        id="waves"
        className="hidden overflow-clip border-l-[1px] border-l-primary bg-background lg:block"
      >
        <ModuleForm />
      </article>
    </div>
  );
};
