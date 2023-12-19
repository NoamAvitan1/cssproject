import * as hti from 'html-to-image';

export const htmlToImage = (html, style) => {
  return new Promise((resolve) => {
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(html, 'text/html');
    const element = parsedHTML.body.firstChild;
    const styleElement = document.createElement('style');
    styleElement.textContent = style;

    element.appendChild(styleElement);
    const img = new Image();

    hti.toJpeg(element).then((url) => {
      const computedStyles = getComputedStyle(element);
      const w = computedStyles.width;
      const h = computedStyles.height;
      img.style.width = w;
      img.style.height = h;

      img.onload = () => {
        resolve(img);
      };

      img.src = url;
    });
  });
};
