"use client";
import { useState, useEffect, useRef } from "react";
import { useStringToNode } from "../_hooks/useStringToNode";

type Props = {
  html: string;
  css: string;
};

export const HTMLDisplay = (props: Props) => {
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  const [html, setHtml] = useState<ChildNode | null>(null);
  const [css, setCss] = useState<HTMLStyleElement | null>(null);

  //   useEffect(() => {
  //     if (!showcaseRef.current) return;
  //     const el = showcaseRef.current;
  //     const styleElement = document.createElement("style");
  //     el.appendChild(styleElement);
  //     setCss(styleElement);
  //   }, []);

  //   useEffect(() => {
  //     if (!showcaseRef.current) return;
  //     const el = showcaseRef.current;
  //     if (html) el.removeChild(el.childNodes[1]);
  //     const htmlElement = useStringToNode(
  //       props.html ? props.html : "<p>Hello World</p>",
  //     );
  //     if (!htmlElement) return;
  //     el.appendChild(htmlElement);
  //     setHtml(htmlElement);
  //   }, [props.html]);

  //   useEffect(() => {
  //     if (!css) return;
  //     console.log(props.css);
  //     css.textContent = props.css ? props.css : null;
  //   }, [props.css]);

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
    <div className="grow bg-white">
      <div id="showcase" ref={showcaseRef}></div>
    </div>
  );
};
