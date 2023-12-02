import { useState } from "react";
import { FaCcPaypal } from "react-icons/fa";

type Props = {};

export const ModuleForm = (props: Props) => {
  const [selectedAccessType, setSelectedAccessType] = useState<
    "public" | "private" | "paid"
  >("public");
  return (
    <form
      action="#"
      onSubmit={(e) => e.preventDefault()}
      className="container flex flex-col gap-4 p-4"
    >
      <label htmlFor="title">Name your module:</label>
      <input
        type="text"
        name="title"
        placeholder="Example: ModuleMania"
        className="border-b border-text bg-transparent py-2 focus:border-accent focus:outline-none w-full"
      />
      {/* <div className="flex flex-col space-y-2">
        <label htmlFor="title">Name your module:</label>
        <input
          type="text"
          name="title"
          placeholder="Example: ModuleMania"
          className="border-b border-text bg-transparent py-2 focus:border-accent focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Describe your module:</label>
        <textarea
          name="description"
          placeholder="Describe the module's theme, contents, etc"
          rows={3}
          className="w-full resize-none border-b border-text bg-transparent py-2 focus:border-accent focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label>Choose access type</label>
        <div className="grid grid-cols-3 gap-x-2 [&_button]:duration-300">
          <button
            onClick={() => setSelectedAccessType("public")}
            className={`rounded-lg border border-accent p-2 ${
              selectedAccessType == "public" && "bg-secondary"
            }`}
          >
            public <span className="text-xs text-accent">default</span>
          </button>
          <button
            onClick={() => setSelectedAccessType("private")}
            className={`rounded-lg border border-accent p-2 ${
              selectedAccessType == "private" && "bg-secondary"
            }`}
          >
            private
          </button>
          <button
            onClick={() => setSelectedAccessType("paid")}
            className={`rounded-lg border border-accent p-2 ${
              selectedAccessType == "paid" && "bg-secondary"
            }`}
          >
            paid <span className="text-xs text-accent">(!)</span>
          </button>
        </div>
        <div className="flex items-center gap-4 ">
          <input
            type="number"
            defaultValue={0}
            className="border border-text bg-transparent p-2 focus:border-accent focus:outline-none"
            />
            <span>DLS</span>
            <div className="bg-clip-text bg-yellow-500">
                <FaCcPaypal className="text-6xl bg-transparent" />
            </div>
        </div>
      </div>
      <button
        type="submit"
        className="container border border-accent py-3 text-success"
      >
        SUBMIT
      </button> */}
    </form>
  );
};
