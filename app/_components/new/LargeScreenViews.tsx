import { FileTypeHeader } from "@/app/new/FileTypeHeader";
import { Monaco } from "../codeEditor/Monaco";

type Props = {
    cssString: string,
    setCssString: (code: string) => void,
    htmlString: string,
    setHtmlString: (code: string) => void,
};

export const LargeScreenViews = (props: Props) => {

  return (
    <div className="max-lg:hidden h-2/3 flex space-x-px">
          <article className="flex h-full w-1/2 flex-col">
            <FileTypeHeader type="css" />
            <Monaco
              h="100%"
              w="100%"
              initialValue={props.cssString}
              handleChange={props.setCssString}
              lineNumbers={true}
            />
          </article>
          <article className="flex h-full w-1/2 flex-col">
            <FileTypeHeader type="html" />
            <Monaco
              h="100%"
              w="100%"
              initialValue={props.htmlString}
              handleChange={props.setHtmlString}
              lang="html"
              lineNumbers={true}
            />
          </article>
        </div>
  );
};
