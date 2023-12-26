import { Database } from "@/types/supabase";

type Props = {
  module: Database["public"]["Tables"]["module"]["Row"];
};

export const SingleModuleHeader = ({ module }: Props) => {
  return (
    <header className="w-full">
      <div className="rounded-lg border-4 border-slate-500 bg-secondary p-4 space-y-1">
        <h1 className="font-bold">Title: <span className="font-normal pl-1">{module.title}</span></h1>
        <p className="font-bold">Description: <span className="font-normal pl-1">{module.description}</span></p>
        <p className="font-bold">Number of downloads:<span className="font-normal pl-1">{module.downloads}</span></p>
        <p className="font-bold">Created at:<span className="font-normal pl-1">{module.created_at}</span></p>
      </div>
    </header>
  );
};
