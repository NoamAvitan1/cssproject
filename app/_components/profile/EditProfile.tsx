"use client";
import { Database } from "@/types/supabase";
import { Modal } from "../common/Modal";
import { BaseSyntheticEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { tell } from "../teller/Tale";
import { profileSchema } from "@/app/_yup/moduleSchema";

type Profile = Database["public"]["Tables"]["profile"]["Row"];
type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  profile: Profile;
};

export const EditProfile = (props: Props) => {


  const handleSubmit = async (e: BaseSyntheticEvent) => {
    try {
      const inputs = e.target.elements;
      let formValidation = {
        user_name: inputs.user_name.value,
        about: inputs.about.value,
      };
      profileSchema
        .validate(formValidation)
        .catch((error: any) => {
          e.preventDefault();
          tell(error.message,'error');
        });
    } catch (error: any) {
      e.preventDefault();
      tell(error.message,'error')   
     }
  };
  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <div className="relative h-[400px] w-[450px] rounded-md bg-white">
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
              <input style={{boxSizing:'border-box'}}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-secondary block w-full p-3"
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
                className="resize-none bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-secondary block w-full p-3"
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
