"use client";

import { useState } from "react";
import { DragItem } from "./DragItem";
import { Modal } from "../common/Modal";
import { tell } from "../teller/Tale";

//@ts-nocheck
type Props = {};

export const Test = (props: Props) => {
  
  const [isOpen, setIsOpen] = useState(false)
  const [x, setX] = useState(0)

  return (
    <div className="">
      <button onClick={() => {tell('Tal told to ' + x, 'normal'), setX(x+1)}}>TELL</button>
      <button onClick={() => setIsOpen(true)}>CLICKME</button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
        <div className="w-[500px] h-[800px] bg-blue-500"></div>
      </Modal>
    </div>
  )
};
