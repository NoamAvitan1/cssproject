export const prettier = async (code, lang = "css") => {
  const prettier = window.prettier,
    prettierPlugins = window.prettierPlugins;
  const formatted = await prettier.format(code, {
    parser: lang,
    plugins: prettierPlugins,
  });
  return formatted;
};
