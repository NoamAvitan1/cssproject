import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { tell } from "../_components/teller/Tale";
import { Database } from "@/types/supabase";
import { Modal } from "../_components/common/Modal";
import { cookies } from "next/headers";
import { SingleModuleImages } from "./SingleModuleImages";
const htmlToImage =  require("../../utils/htmlToImage");

type Module = Database["public"]["Tables"]["module"]["Row"];

interface IModal {
  isOpen: boolean;
  index: number | null;
}

type Props = {
  id: string;
};

export default async function SingleModule(props: Props) {
  const supabase = createServerComponentClient({ cookies });

  const images: Buffer[] = [];

  const { data }: any = await supabase.from("module").select("*").eq("id", props.id);
  const moduleData = data[0];
  for (let i = 0; i < moduleData.html.length; i++) {
    const imageBinary = await htmlToImage(moduleData.html[i], moduleData.css);
    if(!imageBinary || typeof imageBinary === 'number') return;
    images.push(imageBinary);
  }

  return (
    <article
      className="flex h-full w-full items-center justify-center"
      id="app"
    >
      <div className="container grid max-w-[1000px] gap-4 p-4 md:grid-cols-2">
        <SingleModuleImages imageBuffers={JSON.stringify(images)}/>
      </div>
      {/* <Modal isOpen={modal.isOpen} setIsOpen={closeModal}>
        <img
          src={
            examples && typeof modal.index == "number"
              ? examples[modal.index].src
              : undefined
          }
          alt=""
        />
      </Modal> */}
    </article>
  );
}

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
