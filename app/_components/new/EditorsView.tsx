import { CodeBlock } from "@/types/CodeBlock";
import { Monaco } from "../codeEditor/Monaco";
import { Headers } from "./Headers";

type Props = {
  codeBlocks: CodeBlock[];
  setCodeBlocks: Function;
  selectedBlock: number;
  setSelectedBlock: Function;
  lang: 'css' | 'html'
};

export const EditorsView = (props: Props) => {
  
  const handleChange = (code: string) => {
    const selected = props.codeBlocks[0].type == 'html' ? props.selectedBlock + 1 : props.selectedBlock
    props.setCodeBlocks((prev: Array<CodeBlock>) => {
      const newCodeBlocks = prev.map((block, i) => {
        if (i === selected) block.code = code;
        return block;
      });
      return newCodeBlocks
    })    
  };
  // console.log(props.codeBlocks)

  return (
    <div className="flex h-full w-full flex-col space-y-1 bg-secondary">
      <Headers
        codeBlocks={props.codeBlocks}
        setCodeBlocks={props.setCodeBlocks}
        selectedBlock={props.selectedBlock}
        setSelectedBlock={props.setSelectedBlock}
      />
      <div className="flex grow">
        <Monaco
          lang={props.lang}
          w="100%"
          h="100%"
          limit={props.codeBlocks[props.selectedBlock].type === "css" ? 3000 : 500}
          code={props.codeBlocks[props.selectedBlock].code}
          onChange={(code) => handleChange(code)}
        />
      </div>
    </div>
  );
};
