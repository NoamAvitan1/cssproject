"use client";
import { useEffect, useRef, useState } from "react";
import { useStringToNode } from "../../_hooks/useStringToNode";

type Props = {
  html: string;
  css: string;
};

export const HTMLView = (props: Props) => {
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
    setTimeout(() => {
      setHovered(false);
    }, 200);
  };

  useEffect(() => {
    if (!showcaseRef.current) return;
    const el = showcaseRef.current;
    el.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className =
      "absolute left-0 right-0 top-0 border-t-4 border-double border-white";
    const htmlEl = useStringToNode(props.html);
    const style = document.createElement("style");
    style.textContent = props.css;
    el.appendChild(style);
    wrapper.appendChild(htmlEl!);
    el.appendChild(wrapper);
  }, [props.css, props.html]);

  return (
    <article
      onPointerOver={handleHover}
      onPointerLeave={handleHover}
      className="relative flex grow flex-col"
      // className="relative flex grow flex-col overflow-auto bg-secondary p-6"
    >
      {/* <VFX hovered={hovered} /> */}
      <div className="grow">
        <div ref={showcaseRef} className="relative h-full"></div>
      </div>
    </article>
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
