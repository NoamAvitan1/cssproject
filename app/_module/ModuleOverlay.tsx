import { Database } from "@/types/supabase";

type Module = Database["public"]["Tables"]["module"]["Row"];

type Props = {
  toggle: boolean;
  module: Module;
};

export const ModuleOverlay = ({ toggle, module }: Props) => {
  return (
    <div
      className={`absolute inset-0 rounded-l-md border border-secondary bg-background p-2 opacity-90 duration-300 ${
        !toggle && "translate-x-full"
      }`}
    >
      <p>{module?.description}</p>
    </div>
  );
};
