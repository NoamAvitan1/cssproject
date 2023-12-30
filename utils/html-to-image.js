import * as hti from "html-to-image";

export const htmlToImage = async (html, css) => {
  const imageProps = {
    url: "",
    w: 0,
    h: 0,
  };
  const parser = new DOMParser();
  const parsedHTML = parser.parseFromString(html, "text/html");
  const element = parsedHTML.body.firstChild;
  const styleElement = document.createElement("style");
  styleElement.textContent = css;

  element.appendChild(styleElement);

  const container = document.createElement("div");
   container.style.opacity = 0;
  // container.style.width = 0;
  container.style.overflow = "hidden";
  container.appendChild(element);

  app.appendChild(container);

  const url = await hti.toJpeg(element);
  const computedStyles = getComputedStyle(element);
  const w = computedStyles.width;
  const h = computedStyles.height;
  imageProps.w = w;
  imageProps.h = h;
  imageProps.url = url;
  const img = new Image()
  img.style.width = w
  img.style.height = h
  img.src = url
  console.log(url)
  container.remove();
  return imageProps;
};
