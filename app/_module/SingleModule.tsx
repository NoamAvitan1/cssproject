"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { tell } from "../_components/teller/Tale";
import { Database } from "@/types/supabase";
import { htmlToImage } from "../../utils/htmlToImage";
import { Modal } from "../_components/common/Modal";

type Module = Database["public"]["Tables"]["module"]["Row"];

interface IModal {
  isOpen: boolean;
  index: number | null;
}

type Props = {};

export const SingleModule = (props: Props) => {
  const [module, setModule] = useState<Module | null>();
  const [examples, setExamples] = useState<HTMLImageElement[]>();
  const [over, setOver] = useState<number | null>(null);
  const [modal, setModal] = useState<IModal>({ isOpen: false, index: null });

  const supabase = createClientComponentClient();

  const { id } = useParams();

  const closeModal = (...args: any) => {
    setModal((prev: IModal) => ({ index: prev.index, isOpen: false }));
  };

  const getModule = async () => {
    if (!id) return;
    try {
      const { data, error } = await supabase
        .from("module")
        .select("*")
        .eq("id", id);
      setModule(data && data[0]);
      if (!data) tell("Module not found", "alert");
    } catch (error) {
      tell("Error loading module", "error");
    }
  };

  const getExamples = async () => {
    if (!module?.html) return;
    try {
      const imgElement: HTMLImageElement[] = [];
      for (let i = 0; i < module?.html.length; i++) {
        const image = await htmlToImage(module?.html[i], module?.css);
        imgElement.push(image);
      }
      setExamples(imgElement);
    } catch (error) {
      console.error("Error converting HTML to image:", error);
    }
  };

  const handleExampleClick = (i: number) => {
    setModal({ isOpen: true, index: i });
  };

  useEffect(() => {
    getExamples();
  }, [module]);

  useEffect(() => {
    getModule();
  }, []);
  console.log(modal);
  return (
    <article
      className="flex h-full w-full items-center justify-center"
      id="app"
    >
      <div className="container grid max-w-[1000px] gap-4 p-4 md:grid-cols-2">
        {examples &&
          examples.map((example, i) => (
            <div className="rounded-[0.43rem] bg-gradient-to-b from-violet-500 to-sky-500 p-[1px]">
              <button
                key={i}
                onClick={() => handleExampleClick(i)}
                onMouseOver={() => setOver(i)}
                onMouseLeave={() => setOver(null)}
                className="relative aspect-square w-full overflow-clip rounded-md border bg-background"
              >
                <img
                  src={example.src}
                  alt=""
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 ${
                    over == i ? "scale-105" : "scale-100"
                  }`}
                />
              </button>
            </div>
          ))}
      </div>
      <Modal isOpen={modal.isOpen} setIsOpen={closeModal}>
        <img
          src={
            examples && typeof modal.index == "number"
              ? examples[modal.index].src
              : undefined
          }
          alt=""
        />
      </Modal>
    </article>
  );
};

// const queryBuilder = (queries) => {
//   let baseQuery = supabase.from().select()
//   for (const query of queries) {
//     baseQuery += query
//   }
//   baseQuery += limit()
//   return baseQuery
// }

// const publicModulesQuery = queryBuilder([`.range()`, `.eq()`])
// const publicModules = await publicModulesQuery()
