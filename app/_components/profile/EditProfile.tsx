"use client";
import { Database } from "@/types/supabase";
import { Modal } from "../common/Modal";
import { BaseSyntheticEvent, useState } from "react";
import { object, string } from "yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import Api from "@/utils/axios";
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
      emailValidation: string().email().required(),
      about: string().max(500),
    });
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    try {
      const inputs = e.target.elements;
      let formValidation = {
        name: inputs.user_name.value,
        email: inputs.email.value,
        about: inputs.about.value,
      };
      authForm()
        .validate(formValidation)
        .catch((error: yup.ValidationError) => {
          e.preventDefault();
          setValidationError(error);
        });
    } catch (error: any) {
      e.preventDefault();
      setValidationError(error.message);
    }
  };
  return (
    <div>
      <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <div className="h-[550px] w-[600px] rounded-md bg-white">
          <form
            onSubmit={handleSubmit}
            className="text-foreground flex w-full flex-col justify-between h-full gap-1 p-4"
            method="POST"
            action={"/profile/update-profile/" + props.profile.id}
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
              <label className="text-sm text-stone-600" htmlFor="email">
                Email:
              </label>
              <section className="mb-4">
                <input
                  className="w-full rounded-md border border-black p-2 text-[#060504] focus:border-4"
                  name="email"
                  defaultValue={`${props.profile.email}`}
                />
              </section>
              <label className="text-sm text-stone-600" htmlFor="about">
                About:
              </label>
              <section className="mb-4">
                <textarea
                  defaultValue={`${props.profile.about === null ? '' : props.profile.about}`}
                  className="w-full rounded-md border border-black p-2 text-black focus:border-4"
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
    </div>
  );
};