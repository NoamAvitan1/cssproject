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
    el.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "absolute inset-0 bg-white"
    const htmlEl = useStringToNode(props.html);
    const style = document.createElement("style");
    style.textContent = props.css;
    el.appendChild(style);
    wrapper.appendChild(htmlEl!);
    el.appendChild(wrapper);
  }, [props.css, props.html]);

  return (
    <div className="h-full overflow-auto bg-white grow">
      <div ref={showcaseRef} className="relative h-full"></div>
    </div>
  );
};
