import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { Monaco } from "../codeEditor/Monaco";
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

export const LargeScreenViews = (props: Props) => {
  return (
    <div className="flex h-2/3 space-x-px max-lg:hidden">
      <article className="flex h-full w-1/2 flex-col">
        <FileTypeHeader type="css" />
        <Monaco
          h="100%"
          w="100%"
          code={props.cssString}
          handleChange={props.setCssString}
          lineNumbers={true}
        />
      </article>
      <article className="flex h-full w-1/2 flex-col">
        {/* <FileTypeHeader type="css" /> */}
        <HTMLExamplesHeaders
          htmlExamples={props.htmlExamples}
          setHtmlExamples={props.setHtmlExamples}
          selected={props.selectedExample}
          setSelected={props.setSelectedExample}
        />
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
