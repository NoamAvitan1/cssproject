import { Module } from "./Module";

type Props = {
  modules: any[] | null;
  enableEdit?: boolean;
};

export const ModulesData = (props: Props) => {
  return (
    <article className="w-full space-y-6">
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {props.modules
          ? props.modules.map((module, i) => (
              <div key={i}>
                <Module module={module} index={i} enableEdit={props.enableEdit} />
              </div>
            ))
          : null}
      </div>
    </article>
  );
};
