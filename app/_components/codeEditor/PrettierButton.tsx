'use client'
type Props = {
    instance: any
    code: string
};

export const PrettierButton = ({ instance, code }: Props) => {
  // @ts-ignore
  const prettier = window.prettier, prettierPlugins = window.prettierPlugins

  const handleClick = async () => {
    const formatted = await prettier.format(code, {
      parser: "css",
      plugins: prettierPlugins,
    });
    instance.setValue(formatted)
  }

  return (
    <button onClick={handleClick} className="font-extrabold flex items-center">
        <p>P</p>
        <div>
          <p>Y</p>
          <p>X</p>
        </div>
    </button>
  );
};
