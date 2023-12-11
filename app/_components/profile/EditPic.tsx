import { Database } from "@/types/supabase";
import { Modal } from "../common/Modal";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Bucket } from "../test/Bucket";
type Profile = Database["public"]["Tables"]["profile"]["Row"];

type Props = {
  imageUrl: string | null;
  setImageUrl: Function;
};

export const EditPic = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        className="absolute right-2 top-2 text-xl"
        onClick={() => setIsOpen(true)}
      >
        <MdOutlineEdit className="" />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="h-[450px] w-[450px] rounded-md bg-white"> 
            <Bucket
              imageUrl={props.imageUrl}
              setImageUrl={props.setImageUrl}
              setIsOpen={setIsOpen}/>
        </div>
      </Modal>
    </>
  );
};
