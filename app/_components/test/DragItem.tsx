"use client";

import { useState } from "react";

//@ts-nocheck
type Props = {
  elements: Array<any>;
};

export const DragItem = ({ elements }: Props) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleDrop = (e: any) => {
    // console.log(e);
    setIsHovered(false)
  };

  return (
    <div
      onDragEnter={() => setIsHovered(true)}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      onDragLeave={() => setIsHovered(false)}
      className={`${isHovered && "opacity-75"}`}
    >
      <header className="overflow-auto">
        {elements.map((e, i) => (
          <button
            draggable
            onDropCapture={handleDrop}
            key={i}
            onClick={() => setCurrent(i)}
            className="bg-green-500 px-3"
          >
            {i}
          </button>
        ))}
      </header>
      {elements[current]}
    </div>
  );
};
