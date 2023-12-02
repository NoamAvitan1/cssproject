"use client";
import { useEffect, useState } from "react";
import { Tale, talesManager, tellerConfig } from "./Tale";
import { TaleComponent } from "./TaleComponent";

type Props = {};

export const Teller = (props: Props) => {
  const [tales, setTales] = useState<Array<Tale>>([]);

  useEffect(() => {
    const removeTale = (tale: Tale) => {
      setTimeout(() => {
        setTales((prev) => {
          const newTales = prev.filter((t) => tale.id != t.id)
          return newTales
        })
      }, tellerConfig.animationDuration)
    }

    const vanishTale = (tale: Tale) => {
      setTimeout(() => {
        setTales((prev) => {
          const newTales = prev.map((t) => {
            if (tale.id == t.id) {
              t.isVanishing = true
            }
            return t
          });
          return newTales
        });
        removeTale(tale)
      }, tellerConfig.lifeSpan);
    }

    const handleTell = (tale: Tale) => {
      setTales((prev) => [...prev, tale]);
      vanishTale(tale)
      
      const index = tales.length;
    };

    talesManager.on("tell", handleTell);

    return () => {
      talesManager.off("tell", handleTell);
    };
  }, []);

  useEffect(() => {
    tales.map((t) => {
      t.hasAppeared = true;
      return t;
    });
  }, [tales]);

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
