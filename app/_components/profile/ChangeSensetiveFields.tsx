import { useState } from "react";
import { EmailUpdateButton } from "./EmailUpdateButton";
import { PasswordUpdateButton } from "./PasswordUpdateButton";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useParams } from "next/navigation";

type Props = {

};

export const ChangeSensetiveFields = (props: Props) => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [user,setUser] = useAtom(userAtom);
    const {id} = useParams();
    console.log(id);
  return (
     user?.id === id && (
    <section className="flex flex-col items-center h-52 w-full p-4 gap-4 border-4 border-error border-double">
            <h1 className="text-error font-bold text-xl text-center">Warning: The actions below are irrevesible</h1>
            <PasswordUpdateButton/>
            <button onClick={()=>setIsOpen(true)} className="w-full border border-error text-lg hover:font-bold p-2 hover:bg-error duration-300 hover:text-black hover:border-black">Change mail address
            </button>
            <EmailUpdateButton isOpen={isOpen} setIsOpen={setIsOpen}/>
    </section>
  ));
};
