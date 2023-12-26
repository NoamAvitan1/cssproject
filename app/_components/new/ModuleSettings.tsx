import { ModuleSettings as Settings, ModuleType } from "@/types/Modules";
import { useEffect, useState } from "react";
import { HiCog6Tooth } from "react-icons/hi2";
import { tell } from "../teller/Tale";
import Api from "@/utils/axios";
import { CodeBlock } from "@/types/CodeBlock";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";
import { moduleObject } from "@/app/_yup/moduleSchema";
import { prettier } from "@/utils/prettier";
import { useSearchParams } from "next/navigation";
type Props = {
  codeBlocs: CodeBlock[];
  isOpen: boolean;
  settings?: Settings;
  afterSubmit?: () => void;
};

export const ModuleSettings = (props: Props) => {
  const [user] = useAtom(userAtom);
  const [type, setType] = useState<ModuleType>("public");
  const params = useSearchParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let values: any = {};
    values.access_type = type.trim();
    values.description = form["description"].value.trim();
    values.title = form["module_title"].value.trim();
    values.price = form["price"].value ? form["price"].value : 0;
    values.css = props.codeBlocs[0].code.trim();
    values.html = props.codeBlocs
      .filter((block) => block.type == "html")
      .map((block) => block.code.trim());
    values.examples_count = values.html.length;
    values.user_id = user?.id;

    try {
      await prettier(values.css, "css");
      await Promise.all(
        values.html.map(async (code: string) => {
          prettier(code, "html");
        }),
      );
    } catch (error) {
      tell("Please make sure your code is properly formatted", "alert");
      return;
    }

    moduleObject
      .validate(values)
      .then(() => {
        const url = params.has("edit")
          ? `module/update/${params.get("edit")}`
          : "module/add";
        Api.post(url, values)
          .then((data) => {
            console.log(data);
            const moduleTitle = data.data[0].title as string;
            console.log(moduleTitle);
            tell(
              "module " +
                moduleTitle +
                ` ${
                  params.has("edit")
                    ? "successfully updated"
                    : "successfully added"
                }`,
              "success",
            );
            tell("You can edit it later from your profile");
            if (props.afterSubmit) props.afterSubmit();
            form["description"].value = "";
            form["module_title"].value = "";
            form["price"].value = 0;
          })
          .catch((error) => console.log(error));
      })
      .catch((error: any) => {
        tell(error.message, "error");
      });
  };

  useEffect(() => {
    if (props.settings?.access_type) setType(props.settings?.access_type);
  }, [props.settings]);

  return (
    <article className="text-md flex h-full flex-col gap-4 border border-secondary bg-secondary font-light [&_input]:border [&_input]:border-primary [&_input]:bg-transparent [&_input]:p-1">
      <div className="flex items-center justify-center border-accent bg-secondary p-3 text-secondary">
        <HiCog6Tooth className="text-xl text-accent" />
      </div>
      <form
        name="moduleForm"
        onSubmit={(e) => handleSubmit(e)}
        className="flex h-full flex-col justify-between pb-4"
      >
        <section className="flex flex-col gap-8 p-2">
          <div className="space-y-1">
            <label htmlFor="module_title">Title</label>
            <input
              defaultValue={props.settings?.title ?? ""}
              name="module_title"
              type="text"
              className="focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="">Access</label>
            <div className="grid grid-cols-3 gap-1 [&_button]:duration-150">
              <button
                type="button"
                onClick={() => setType("public")}
                className={`w-full border border-primary py-1 ${
                  type == "public" ? "opacity-50" : ""
                }`}
              >
                public
              </button>
              <button
                type="button"
                onClick={() => setType("paid")}
                className={`w-full border border-primary py-1 ${
                  type == "paid" ? "opacity-50" : ""
                }`}
              >
                paid
              </button>
              <button
                type="button"
                onClick={() => setType("private")}
                className={`w-full border border-primary py-1 ${
                  type == "private" ? "opacity-50" : ""
                }`}
              >
                private
              </button>
            </div>
          </div>
          <div className={`space-y-1 ${type == "paid" ? "" : "hidden"}`}>
            <label htmlFor="price" className="flex gap-1">
              Price <span className="text-slate-500">(in US Dollars)</span>
            </label>
            <input
              defaultValue={props.settings?.price ?? 0}
              step={0.01}
              type="number"
              name="price"
              min={0}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="description">Description</label>
            <textarea
              defaultValue={props.settings?.description ?? ""}
              placeholder="You can describe your module's theme, purpose, etc."
              name="description"
              rows={7}
              maxLength={200}
              className="w-full border border-primary bg-transparent px-px text-sm focus:outline-none"
            />
          </div>
        </section>
        <button className="mx-2 mt-4 border border-success bg-success p-2 text-slate-100 duration-300 active:scale-95">
          Upload module
        </button>
      </form>
    </article>
  );
};
