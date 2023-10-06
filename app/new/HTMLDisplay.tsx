"use client";
import { useEffect, useRef } from "react";
import { useStringToNode } from "../_hooks/useStringToNode";

type Props = {
  html: string;
  css: string;
};

export const HTMLDisplay = (props: Props) => {
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
    <div className="h-1/2 overflow-auto bg-white">
      <div id="showcase" ref={showcaseRef} className="relative"></div>
    </div>
  );
};
