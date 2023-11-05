"use client";

import { useState } from "react";
import { HTMLView } from "./HTMLView";
import { dummyCss, dummyHtml } from "./dummyFiles";
import { LargeScreenViews } from "./LargeScreenViews";
import { SmallScreenViews } from "./SmallScreenViews";
import { HTMLExamplesHeaders } from "./HTMLExamplesHeaders";

export const NewLayout = () => {
  const [htmlExamples, setHtmlExamples] = useState([dummyHtml]);
  const [selectedExample, setSelectedExample] = useState(0);
  const [cssString, setCssString] = useState(dummyCss);

  return (
    <div className="grid h-full w-full grow grid-cols-3 space-x-px overflow-x-hidden border-t border-aura bg-aura">
      <section className="col-span-2 flex flex-col overflow-auto">
        <LargeScreenViews
          cssString={cssString}
          setCssString={setCssString}
          htmlExamples={htmlExamples}
          setHtmlExamples={setHtmlExamples}
          selectedExample={selectedExample}
          setSelectedExample={setSelectedExample}
        />
        <SmallScreenViews
          cssString={cssString}
          setCssString={setCssString}
          htmlExamples={htmlExamples}
          setHtmlExamples={setHtmlExamples}
          selectedExample={selectedExample}
          setSelectedExample={setSelectedExample}
        />
        <div className="grow">
          <HTMLView html={htmlExamples[selectedExample]} css={cssString} />
        </div>
      </section>
      <section className="flex flex-col bg-background">
        there's a section right here
      </section>
    </div>
  );
};
