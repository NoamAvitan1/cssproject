"use client";
import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { Monaco } from "../codeEditor/Monaco";
import { useState } from "react";
import { HTMLExamplesEditor } from "./HTMLExamplesEditor";
import { HTMLExamplesHeaders } from "./HTMLExamplesHeaders";

type Props = {
  cssString: string;
  setCssString: (code: string) => void;
  htmlExamples: Array<string>;
  setHtmlExamples: (newExamples: Array<string>) => void;
  selectedExample: number;
  setSelectedExample: (index: number) => void;
};

export const SmallScreenViews = (props: Props) => {
  const [visibleView, setVisibleView] = useState("css");

  return (
    <div className="flex h-2/3 space-x-px lg:hidden">
      <article className="flex h-full w-full flex-col">
        <header className="mb-px flex gap-px">
          <HTMLExamplesHeaders
            htmlExamples={props.htmlExamples}
            setHtmlExamples={props.setHtmlExamples}
            selected={props.selectedExample}
            setSelected={props.setSelectedExample}
          />
          {/* <button
            onClick={() => setVisibleView("css")}
            className={`duration-75 ${visibleView == "css" && "opacity-75"}`}
          >
            <FileTypeHeader type="css" />
          </button>
          <button
            onClick={() => setVisibleView("html")}
            className={`duration-75 ${visibleView == "html" && "opacity-75"}`}
          >
            <FileTypeHeader type="html" />
          </button> */}
        </header>
        <HTMLExamplesEditor
          htmlExamples={props.htmlExamples}
          setHtmlExamples={props.setHtmlExamples}
          selected={props.selectedExample}
          setSelected={props.setSelectedExample}
        />
      </article>
    </div>
  );
};
