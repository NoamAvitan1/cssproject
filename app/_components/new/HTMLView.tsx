"use client";
import { useEffect, useRef, useState } from "react";
import { useStringToNode } from "../../_hooks/useStringToNode";

type Props = {
  html: string;
  css: string;
};

export const HTMLView = (props: Props) => {
  const showcaseRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
    setTimeout(() => {
      setHovered(false);
    }, 200);
  };

  useEffect(() => {
    if (!showcaseRef.current) return;
    const el = showcaseRef.current as HTMLIFrameElement;

    const iframeDocument = el.contentDocument || el.contentWindow?.document;
    if (iframeDocument) {
      iframeDocument.body.innerHTML = `<div><style>${props.css}</style>${props.html}</div>`;
    }
    el.contentDocument?.write(
      `<div><style>${props.css}</style>${props.html}</div>`,
    );
    const newHeight = el.contentWindow?.document.body.scrollHeight;
    if (!newHeight) return
    el.height = newHeight + 10 + "px";
    // console.log(iframeDocument?.documentElement.innerHTML);
  }, [props.css, props.html]);

  return (
    <iframe
      id="showcase"
      ref={showcaseRef}
      className="min-w-full border"
    ></iframe>
  );
};

const VFX = ({ hovered }: { hovered: boolean }) => {
  const screws = [
    "top-2 right-2 rotate-[12deg]",
    "top-2 left-2 rotate-[120deg]",
    "bottom-2 right-2 rotate-[79deg]",
    "bottom-2 left-2 rotate-[150deg]",
  ];
  return (
    <>
      {screws.map((s, i) => (
        <span
          key={i}
          className={
            `absolute flex h-3 w-3 items-center justify-center overflow-hidden rounded-full bg-accent ` +
            s
          }
        >
          <span className="h-3 w-1 bg-secondary"></span>
        </span>
      ))}
      <span className="absolute left-1/2 top-[6px] h-3 w-12 -translate-x-1/2 rounded-full bg-accent"></span>
      <div className="absolute inset-0 m-6 overflow-hidden rounded">
        <div className={`h-full ${hovered && "reflection"}`}>
          <div
            className={`relative -left-16 h-[120%] w-8 -translate-y-[10%] rotate-12 bg-black bg-opacity-10`}
          ></div>
        </div>
      </div>
    </>
  );
};

// const wrapper = document.createElement("div");
// wrapper.className =
//   "w-full";
// const htmlEl = useStringToNode(props.html);
// const style = document.createElement("style");
// style.textContent = props.css;
// el.appendChild(style);
// wrapper.appendChild(htmlEl!);
// el.appendChild(wrapper);
