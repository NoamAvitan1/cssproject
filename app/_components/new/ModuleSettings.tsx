import { ModuleType } from "@/types/Modules";
import { useState } from "react";
import { HiCog6Tooth } from "react-icons/hi2";
type Props = {
  isOpen: boolean
};

export const ModuleSettings = (props: Props) => {
  const [type, setType] = useState<ModuleType>("public");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

  }

  return (
    <article className="text-md flex h-full flex-col gap-4 border border-secondary bg-secondary font-light [&_input]:border [&_input]:border-primary [&_input]:bg-transparent [&_input]:p-1">
      <div className="flex items-center justify-center border-accent bg-secondary p-3 text-secondary">
        <HiCog6Tooth className="text-xl text-accent" />
      </div>
      <form onSubmit={e => handleSubmit(e)} className="flex h-full flex-col justify-between pb-4">
        <section className="flex flex-col gap-8 p-2">
          <div className="space-y-1">
            <label htmlFor="title">Title</label>
            <input name="title" type="text" className="focus:outline-none" />
          </div>
          <div className="space-y-1">
            <label htmlFor="">Access</label>
            <div className="grid grid-cols-3 gap-1 [&_button]:duration-150">
              <button
                onClick={() => setType("public")}
                className={`w-full border border-primary py-1 ${
                  type == "public" ? "opacity-50" : ""
                }`}
              >
                public
              </button>
              <button
                onClick={() => setType("paid")}
                className={`w-full border border-primary py-1 ${
                  type == "paid" ? "opacity-50" : ""
                }`}
              >
                paid
              </button>
              <button
                onClick={() => setType("private")}
                className={`w-full border border-primary py-1 ${
                  type == "private" ? "opacity-50" : ""
                }`}
              >
                private
              </button>
            </div>
          </div>
          {type == "paid" && (
            <div className="space-y-1">
              <label htmlFor="price" className="flex gap-1">
                Price <span className="text-slate-500">(in US Dollars)</span>
              </label>
              <input
                type="number"
                name="price"
                max={99}
                min={1}
                className="w-full focus:outline-none"
              />
            </div>
          )}
          <div className="space-y-1">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
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
