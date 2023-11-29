"use client";

import { useState } from "react";
import { DragItem } from "./DragItem";
import { Modal } from "../common/Modal";

//@ts-nocheck
type Props = {};

export const Test = (props: Props) => {
  const sections = useState({
    a: [<p className="w-full h-full">0</p>],
    b: [],
    c: [<p className="w-full h-full">1</p>],
    d: [],
  })

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="">
      <button onClick={() => setIsOpen(true)}>CLICKME</button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
        <div className="w-[300px] h-[300px] bg-blue-500"></div>
      </Modal>
    </div>
  )
};
