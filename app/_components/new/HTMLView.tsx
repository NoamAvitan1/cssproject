"use client";
import { useEffect, useRef } from "react";
import { useStringToNode } from "../../_hooks/useStringToNode";

type Props = {
  html: string;
  css: string;
};

export const HTMLView = (props: Props) => {
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showcaseRef.current) return;
    const el = showcaseRef.current;
    el.innerHTML = ''
    const htmlEl = useStringToNode(props.html);
    const style = document.createElement("style");
    style.textContent = props.css;
    el.appendChild(style);
    el.appendChild(htmlEl!);
  }, [props.css, props.html]);

  return (
    <div className="h-full overflow-auto bg-white text-black">
      <div id="showcase" ref={showcaseRef} className="relative"></div>
    </div>
  );
};
