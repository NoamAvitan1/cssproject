import { Monaco } from "../_components/codeEditor/Monaco";
import { Options } from "../_components/new/Options";
import { SectionsWrapper } from "../_components/new/SectionsWrapper";
import { FileTypeHeader } from "./FileTypeHeader";

export default async function New() {
  return (
    <div className="grid h-full w-full grow grid-cols-3 space-x-px border-t border-aura bg-aura">
      <section className="flex flex-col overflow-auto">
        <FileTypeHeader type="css" />
        <Monaco
          h="100%"
          w="100%"
          // contrastBorder={true}
          // rounded={true}
          lineNumbers={true}
        />
      </section>
      <section className="flex flex-col overflow-auto">
        <FileTypeHeader type="html" />
        <Monaco
          h="100%"
          w="100%"
          // contrastBorder={true}
          // rounded={true}
          lineNumbers={true}
        />
      </section>
      <section className="flex flex-col bg-background">there's a section right here</section>
    </div>
  );
}
