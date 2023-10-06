"use client";

import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { useState } from "react";
import { Monaco } from "../codeEditor/Monaco";
import { HTMLDisplay } from "@/app/new/HTMLDisplay";

export const NewLayout = () => {
  const [htmlString, setHtmlString] = useState("<p>Hello World<p/>");
  const [cssString, setCssString] = useState("");

  return (
    <div className="grid h-full w-full grow grid-cols-3 space-x-px border-t border-aura bg-aura">
      <section className="flex flex-col overflow-auto">
        <FileTypeHeader type="css" />
        <Monaco
          h="100%"
          w="100%"
          handleChange={setCssString}
          lineNumbers={true}
        />
      </section>
      <section className="flex flex-col overflow-auto">
        <FileTypeHeader type="html" />
        <Monaco
          h="50%"
          w="100%"
          handleChange={setHtmlString}
          lang="html"
          lineNumbers={true}
        />
        <HTMLDisplay
          html={htmlString}
          css={cssString}
        />
      </section>
      <section className="flex flex-col bg-background">
        there's a section right here
      </section>
    </div>
  );
};
