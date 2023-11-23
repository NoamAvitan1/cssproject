import { CodeBlock } from "@/types/CodeBlock";
import { Monaco } from "../codeEditor/Monaco";
import { Headers } from "./Headers";

type Props = {
  codeBlocks: CodeBlock[];
  setCodeBlocks: Function;
  selectedBlock: number;
  setSelectedBlock: Function;
};

export const EditorsView = (props: Props) => {
  return (
    <div className="row-span-2 flex h-full w-full flex-col">
      <Headers
        codeBlocks={props.codeBlocks}
        setCodeBlocks={props.setCodeBlocks}
        selectedBlock={props.selectedBlock}
        setSelectedBlock={props.setSelectedBlock}
      />
      <div className="flex grow">
        <Monaco
          lang="html"
          w="100%"
          h="100%"
          code={props.codeBlocks[props.selectedBlock].code}
        />
      </div>
    </div>
  );
};
