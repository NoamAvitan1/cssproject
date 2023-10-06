"use client";

import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { useState } from "react";
import { Monaco } from "../codeEditor/Monaco";
import { HTMLDisplay } from "@/app/new/HTMLDisplay";

export const NewLayout = () => {
  const defaultCss = `.box {
    background-color: #000;
    font-family: sans-serif;
  }
  .cool-text {
    color: black;
    font-size: 50px;
    text-align: center;
    animation: cool-text 1s infinite;
  }
  @keyframes cool-text {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(1deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(-1deg);
    }
    100% {
      transform: rotate(0deg);
    }
  `;
  const defaultHtml = `<div className="box">
  <div class="cool-text">Hello World!</div>
</div>
`;

  const [htmlString, setHtmlString] = useState(defaultHtml);
  const [cssString, setCssString] = useState(defaultCss);

  return (
    <div className="grid h-full w-full grow grid-cols-3 space-x-px border-t border-aura bg-aura">
      <section className="flex flex-col overflow-auto">
        <FileTypeHeader type="css" />
        <Monaco
          h="100%"
          w="100%"
          initialValue={cssString}
          handleChange={setCssString}
          lineNumbers={true}
        />
      </section>
      <section className="flex flex-col overflow-aut">
        <FileTypeHeader type="html" />
        <Monaco
          h="50%"
          w="100%"
          initialValue={htmlString}
          handleChange={setHtmlString}
          lang="html"
          lineNumbers={true}
        />
        <HTMLDisplay html={htmlString} css={cssString} />
      </section>
      <section className="flex flex-col bg-background">
        there's a section right here
      </section>
    </div>
  );
};
