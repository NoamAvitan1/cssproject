import { Database } from "@/types/supabase";
import { Modal } from "../common/Modal";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
type Profile = Database["public"]["Tables"]["profile"]["Row"];

type Props = {
  profile: Profile;
};

export const EditPic = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button className="absolute right-0" onClick={() => setIsOpen(true)}></button>
      <MdOutlineEdit className="" />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="h-[100px] w-[100px] bg-white"></div>
      </Modal>
    </>
  );
};
