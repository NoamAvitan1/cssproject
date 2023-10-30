"use client";
import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { Monaco } from "../codeEditor/Monaco";
import { useState } from "react";

type Props = {
  cssString: string;
  setCssString: (code: string) => void;
  htmlString: string;
  setHtmlString: (code: string) => void;
};

export const SmallScreenViews = (props: Props) => {
  const [visibleView, setVisibleView] = useState("css");

  return (
    <div className="flex h-2/3 space-x-px lg:hidden">
      <article className="flex h-full w-full flex-col">
        <header className="mb-px flex gap-px">
          <button onClick={() => setVisibleView("css")} className={`duration-75 ${visibleView == 'css' && 'opacity-75'}`}>
            <FileTypeHeader type="css" />
          </button>
          <button onClick={() => setVisibleView("html")}
          className={`duration-300 ${visibleView == 'html' && 'opacity-75'}`}>
            <FileTypeHeader type="html" />
          </button>
        </header>
          <Monaco
            h="100%"
            w="100%"
            hidden={visibleView != "css" ? true : false}
            initialValue={props.cssString}
            handleChange={props.setCssString}
            lineNumbers={true}
          />
          <Monaco
            h="100%"
            w="100%"
            hidden={visibleView != "html" ? true : false}
            initialValue={props.htmlString}
            handleChange={props.setHtmlString}
            lang="html"
            lineNumbers={true}
          />
      </article>
    </div>
  );
};
