import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { CodeBlock } from "@/types/CodeBlock";

type Props = {
    codeBlocks: Array<CodeBlock>
    setCodeBlocks: Function
    setSelectedBlock: Function
};

export const Headers = (props: Props) => {

  return (
    <header className="grid space-x-px">
      <div className="hidden lg:block"></div>
        <div className="flex space-x-px">
          {props.codeBlocks.map((c, i) => (
              <div key={i}>
                  <FileTypeHeader type={c.type} />
              </div>
          ))}
        </div>
    </header>
  );
};
