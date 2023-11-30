"use client";
import { useEffect, useState } from "react";
import { Tale, talesManager, tellerConfig } from "./Tale";
import { TaleComponent } from "./TaleComponent";

type Props = {};

export const Teller = (props: Props) => {
  const [tales, setTales] = useState<Array<Tale>>([]);

  useEffect(() => {
    const handleTell = (tale: Tale) => {
      setTales((prev) => [...prev, tale]);
      const index = tales.length;
      setTimeout(() => {
        tale.vanish(1000,
          () => {
            setTales(prev => {
              const newTales = prev.map((t, i) => {
                if (i == index) return {...t, isVanishing: true} as Tale;
                return t
              })
              return newTales
            })
          },
          () => setTales((prev) => prev.filter((t, i) => i !== index)),
        );
      }, tellerConfig.duration);
    };

    talesManager.on("tell", handleTell);

    return () => {
      talesManager.off("tell", handleTell);
    };
  }, []);

  return (
    <article className="appear container fixed left-1/2 z-50 mt-1 flex max-w-[800px] -translate-x-1/2 flex-col gap-2 overflow-x-hidden">
      {tales.map((tale, i) => (
        <div
          className={`relative w-full ${tale.isVanishing ? "vanish" : ""}`}
          key={i}
        >
          <TaleComponent text={tale.text} type={tale.type} />
        </div>
      ))}
    </article>
  );
};
