"use client";

import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { useState } from "react";
import { Monaco } from "../codeEditor/Monaco";
import { HTMLDisplay } from "./HTMLDisplay";
import { dummyCss, dummyHtml } from "./dummyFiles";
import { JsxElement } from "typescript";

export const NewLayout = () => {
  const [views, setViews] = useState<Array<JsxElement>>([])
  const [htmlString, setHtmlString] = useState(dummyHtml);
  const [cssString, setCssString] = useState(dummyCss);

  return (
    <div className="grid h-full w-full grow grid-cols-3 space-x-px border-t border-aura bg-aura">
      <section className="flex flex-col overflow-auto">
        <FileTypeHeader type="css" />
        <Monaco
          h="50%"
          w="100%"
          initialValue={cssString}
          handleChange={setCssString}
          lineNumbers={true}
        />
        <FileTypeHeader type="html" />
        <Monaco
          h="50%"
          w="100%"
          initialValue={htmlString}
          handleChange={setHtmlString}
          lang="html"
          lineNumbers={true}
          />
      </section>
      <section className="overflow-aut flex flex-col">
        <HTMLDisplay html={htmlString} css={cssString} />
      </section>
      <section className="flex flex-col bg-background">
        there's a section right here
      </section>
    </div>
  );
};
