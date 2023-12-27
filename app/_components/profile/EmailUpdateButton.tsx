import { useAtom } from "jotai";
import { Modal } from "../common/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { userAtom } from "@/app/_jotai/userAtoms";
import { BaseSyntheticEvent, useRef, useState } from "react";
import { tell } from "../teller/Tale";
import { emaileSchema } from "@/app/_yup/moduleSchema";
type Props = {
  isOpen: boolean;
  setIsOpen: Function;
};

export const EmailUpdateButton = (props: Props) => {
  const [user, setUser] = useAtom(userAtom);
 
  const handleSubmit = (e: BaseSyntheticEvent) => {
    try {
      const inputs = e.target.elements;
      let confirmEmail= inputs.confirmEmail?.value;
      let formValidation = {
        email: inputs.email?.value,
      };
      if (formValidation.email !== confirmEmail) {
        e.preventDefault();
        throw new Error("Emails do not match");
      }
      if(formValidation.email === user?.email){
        e.preventDefault();
        throw new Error("Email already in use");
      }
      emaileSchema
        .validate(formValidation)
        .catch((error: any) => {
          e.preventDefault();
          tell(error.message,'error')
        });
    } 
    catch (error:any) {
      tell(error.message,'error');
    }
    tell('Check your mail for continue the process');
  };
  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <div className="h-[300px] w-[400px] rounded-md bg-white">
        <AiOutlineClose
          id="close-button"
          className="absolute right-1 top-2 cursor-pointer text-xl text-black"
        />
        <form
          onSubmit={handleSubmit}
          className="flex h-full w-full flex-col p-2 "
          action={"/auth/update-email/" + user?.id}
          method="POST"
        >
          <label className="text-black" htmlFor="email">Email:</label>
          <input
            name="email"
            placeholder="marypopins@email.com"
            className="mb-4 w-full rounded-md border border-black p-2 text-[#060504] "
            type="text"
          />
          <label className="text-black" htmlFor="confirmEmail">Confirm email:</label>
          <input
            name="confirmEmail"
            placeholder="marypopins@email.com"
            className="w-full rounded-md border border-black p-2 text-[#060504] "
            type="text"
          />
          <div className="grow"></div>
          <button className="rounded bg-secondary p-2">save</button>
        </form>
      </div>
    </Modal>
  );
};
