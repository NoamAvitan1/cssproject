const nhti = require("node-html-to-image");
const fs = require("fs");

module.exports = async (html: string, style: string) => {
  const styledHtml = `<div><style>${style}</style>${html}</div>`;
  try {
    const imageBuffer = await nhti({
      html: styledHtml,
    });
    return imageBuffer as Buffer;
  } catch (error) {
    console.log(error);
  }
};
