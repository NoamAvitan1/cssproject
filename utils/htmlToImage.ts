const nhti = require("node-html-to-image");

module.exports = async (html:string, style:string) => {
  const styledHtml = `<div><style>${style}</style>${html}</div>`;
  try {
    const img = await nhti({
      html: styledHtml,
    });
    console.log(img)
    return img as Buffer;
  } catch (error) {
    console.log(error);
  }
};
