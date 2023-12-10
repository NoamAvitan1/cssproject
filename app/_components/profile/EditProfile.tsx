"use client";
import { Database } from "@/types/supabase";
import { Modal } from "../common/Modal";
import { BaseSyntheticEvent, useState } from "react";
import { object, string } from "yup";
import * as yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import { tell } from "../teller/Tale";

type Profile = Database["public"]["Tables"]["profile"]["Row"];
type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  profile: Profile;
};

export const EditProfile = (props: Props) => {
  const [validationError, setValidationError] =
    useState<yup.ValidationError | null>(null);

  const authForm = () => {
    return object({
      user_name: string().min(3).required(),
      about: string().max(200),
    });
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    try {
      const inputs = e.target.elements;
      let formValidation = {
        user_name: inputs.user_name.value,
        about: inputs.about.value,
      };
      authForm()
        .validate(formValidation)
        .catch((error: yup.ValidationError) => {
          e.preventDefault();
          tell(error.message,'error');
          setValidationError(error);
        });
    } catch (error: any) {
      e.preventDefault();
      setValidationError(error.message);
      tell(error.message,'error')   
     }
  };
  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <div className="relative h-[60vh] w-[60vh] rounded-md bg-white">
        <AiOutlineClose
          id="close-button"
          className="absolute right-1 top-2 cursor-pointer text-2xl text-black"
        />
        <form
          onSubmit={handleSubmit}
          className="text-foreground mt-2 flex h-full w-full flex-col justify-between gap-1 p-4"
          method="POST"
          action={"/user/update-user/" + props.profile.id}
        >
          <article>
            <label className="text-sm text-stone-600" htmlFor="user_name">
              Name:
            </label>
            <section className="mb-4">
              <input
                className="w-full rounded-md border border-black p-2 text-[#060504] focus:border-4"
                name="user_name"
                defaultValue={`${props.profile.user_name}`}
              />
            </section>
            <label className="text-sm text-stone-600" htmlFor="about">
              About:
            </label>
            <section className="mb-4">
              <textarea
                defaultValue={`${props.profile.about ?? ""}`}
                className="w-full resize-none rounded-md border border-black p-2 text-black focus:border-4"
                name="about"
                id=""
                rows={5}
              ></textarea>
            </section>
          </article>
          <button className="mb-2 rounded bg-secondary px-4 py-2 text-lg text-text">
            save
          </button>
        </form>
      </div>
    </Modal>
  );
};
