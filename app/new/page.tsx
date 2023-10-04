import { Monaco } from "../_components/codeEditor/Monaco";
import { Options } from "../_components/new/Options";
import { SectionsWrapper } from "../_components/new/SectionsWrapper";

export default async function New() {
  return (
    <div className="w-full grow flex">
      <SectionsWrapper
        a={
          <section>
            <Monaco
              h="80vh"
              contrastBorder={true}
              rounded={true}
              lineNumbers={true}
            />
          </section>
        }
        b={
          <section>
            <Options />
          </section>
        }
        c={
          <section>
            there's a section right here
          </section>
        }
      />
    </div>
  );
}
