import * as hti from "html-to-image";

export const htmlToImage = async (html, css) => {
  const imageProps = {
    url: "",
    w: 0,
    h: 0,
  };

  const element = document.createElement("div");

  element.classList.add("unsetter")

  element.innerHTML = `<style>.unsetter {color: black; background-color: white;}\n\n${css}</style>${html}`;

  const container = document.createElement("div");
  container.style.opacity = 0;
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
  // const img = new Image();
  // img.style.width = w;
  // img.style.height = h;
  // img.src = url;
  container.remove();
  return imageProps;
};
