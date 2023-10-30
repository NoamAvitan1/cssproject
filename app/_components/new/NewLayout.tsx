"use client";

import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { useState } from "react";
import { Monaco } from "../codeEditor/Monaco";
import { HTMLView } from "./HTMLView";
import { dummyCss, dummyHtml } from "./dummyFiles";
import { JsxElement } from "typescript";
import { LargeScreenViews } from "./LargeScreenViews";
import { SmallScreenViews } from "./SmallScreenViews";

export const NewLayout = () => {
  const [htmlString, setHtmlString] = useState(dummyHtml);
  const [cssString, setCssString] = useState(dummyCss);

  return (
    <div className="grid h-full w-full grow grid-cols-3 space-x-px overflow-x-hidden border-t border-aura bg-aura">
      <section className="col-span-2 flex flex-col overflow-auto">
        <LargeScreenViews
          cssString={cssString}
          setCssString={setCssString}
          htmlString={htmlString}
          setHtmlString={setHtmlString}
        />
        <SmallScreenViews
          cssString={cssString}
          setCssString={setCssString}
          htmlString={htmlString}
          setHtmlString={setHtmlString}
        />
        <div className="grow">
          <HTMLView html={htmlString} css={cssString} />
        </div>
      </section>
      <section className="flex flex-col bg-background">
        there's a section right here
      </section>
    </div>
  );
};
