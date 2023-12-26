"use client";
import { tell } from "@/app/_components/teller/Tale";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { object, string } from "yup";
import * as yup from "yup";

type Props = {};

export default function UpdateUserPassword(props: Props) {
  const [user,setUser] = useAtom(userAtom);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [validationError, setValidationError] =
    useState<yup.ValidationError | null>(null);

  const authSchema = () => {
    return object({
      password: string().min(8).password().required(),
    });
  };
  const handleSubmit = (e: BaseSyntheticEvent) => {
    try {
      const inputs = e.target.elements;
      let confirmPassword = inputs.confirmPassword?.value;
      let formValidation = {
        password: inputs.password?.value,
      };
      if (formValidation.password !== confirmPassword) {
        e.preventDefault();
        // console.log(confirmPassword);
        throw new Error("Passwords do not match");
      }
      authSchema()
        .validate(formValidation)
        .catch((error: yup.ValidationError) => {
          e.preventDefault();
          setValidationError(error);
          tell(error.message,'error');
        });
    } catch (error:any) {
      setValidationError(error);
      tell(error.message,'error');
      e.preventDefault();
    }
  };

  return (
    <div className="flex h-full w-full justify-center">
      <form
        onSubmit={handleSubmit}
        action={"/auth/update-password/" + user?.id}
        method="POST"
        className="mt-8 flex h-[350px] w-[320px] flex-col items-center gap-2 border border-secondary p-2"
      >
        <h1 className="grow text-lg">Change your password down below</h1>
        <div className="flex w-full flex-col gap-2">
          <label className="text-md" htmlFor="password">
            Password:
          </label>
          <section className="justifny-between relative mb-6 flex w-full items-center">
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
            <span className="absolute right-2.5 cursor-pointer">
              {showPassword ? (
                <AiOutlineEye
                  className="text-slate-900"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="text-slate-900"
                  onClick={() => setShowPassword(true)}
                />
              )}{" "}
            </span>
          </section>
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-md" htmlFor="Confirm password">
            Confirm Password:
          </label>
          <section className="relative mb-6 flex w-full items-center justify-between ">
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              name="confirmPassword"
              required
              autoComplete="new-password"
            />
            <span className="absolute right-2.5 cursor-pointer">
              {showPassword ? (
                <AiOutlineEye
                  className="text-slate-900"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="text-slate-900"
                  onClick={() => setShowPassword(true)}
                />
              )}{" "}
            </span>
          </section>
        </div>
        <button className="w-full bg-secondary p-2">Save</button>
      </form>
    </div>
  );
}
