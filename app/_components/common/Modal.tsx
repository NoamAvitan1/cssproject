"use client";

import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Function;
  onOpen?: Function;
  onClose?: Function;
};

export const Modal = (props: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const onClose = () => {
    if (props.onClose) props.onClose();
    setIsClosing(true);
    setTimeout(() => {
      props.setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (props.onOpen) props.onOpen();
  }, []);

  return (
    props.isOpen && (
      <div
        onClick={onClose}
        className={`${
          isClosing && "modal-container-vanish backdrop-blur-none"
        } fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm`}
      >
        <article
          onClick={(e) => e.stopPropagation()}
          className={`${
            isClosing ? "modal-shrink" : "modal-grow"
          } flex max-h-[90%] max-w-[95%] justify-center`}
        >
          {props.children}
        </article>
      </div>
    )
  );
};
