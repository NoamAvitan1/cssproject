const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#FFC0CB",
  "#A52A2A",
];

const recursiveBorder = (element: Element, depth: number, currentDepth: number = 0) => {
  for (const child of element.children) {
    const colorIndex = currentDepth % colors.length;
    const color = colors[colorIndex];

    child.classList.add("border-4");
    // @ts-ignore
    child.style.borderColor = color;

    if (currentDepth >= depth) return;

    if (child.children.length > 0) {
      recursiveBorder(child, depth, currentDepth + 1);
    }
  }
};


export const HTMLDebugger = (selector: string, depth: number) => {
  const papaElement = document.querySelector(selector) as Element
  recursiveBorder(papaElement, depth)
}
