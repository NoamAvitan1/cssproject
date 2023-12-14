import { ModuleType } from "@/types/Modules";
import { useState } from "react";
import { HiCog6Tooth } from "react-icons/hi2";
import { array, number, object, string } from "yup";
import { tell } from "../teller/Tale";
import Api from "@/utils/axios";
import { CodeBlock } from "@/types/CodeBlock";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";
import { moduleObject } from "@/app/_yup/moduleSchema";
type Props = {
  codeBlocs: CodeBlock[]
  isOpen: boolean;
};

export const ModuleSettings = (props: Props) => {
  const [user] = useAtom(userAtom)
  const [type, setType] = useState<ModuleType>("public");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let values: any = {};
    values.access_type = type;
    values.description = form["description"].value;
    values.title = form["module_title"].value;
    values.price = form["price"].value ? form["price"].value : 0;
    values.css = props.codeBlocs[0].code
    values.html = props.codeBlocs.filter(block => (block.type == 'html')).map(block => block.code)
    values.user_id = user?.id

    moduleObject
      .validate(values)
      .then(() => {
        Api.post('module/add', values)
        .then(data => {
          const moduleTitle = data.data[0].title as string 
          tell("module " + moduleTitle + " successfully added", 'success')
        })
        .catch(error => {
        })
      })
      .catch((error: any) => {
        tell(error.message, "error");
      });
  };

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
            <input name="module_title" type="text" className="focus:outline-none" />
          </div>
          <div className="space-y-1">
            <label htmlFor="">Access</label>
            <div className="grid grid-cols-3 gap-1 [&_button]:duration-150">
              <button type="button"
                onClick={() => setType("public")}
                className={`w-full border border-primary py-1 ${
                  type == "public" ? "opacity-50" : ""
                }`}
              >
                public
              </button>
              <button type="button"
                onClick={() => setType("paid")}
                className={`w-full border border-primary py-1 ${
                  type == "paid" ? "opacity-50" : ""
                }`}
              >
                paid
              </button>
              <button type="button"
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
              type="number"
              name="price"
              min={0}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              rows={5}
              className="w-full border border-primary bg-transparent focus:outline-none"
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
