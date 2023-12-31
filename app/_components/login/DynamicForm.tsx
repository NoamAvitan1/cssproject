"use client";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BaseSyntheticEvent, useState } from "react";
import { object, string } from "yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import Messages from "./messages";
import Api from "@/utils/axios";
import { tell } from "../teller/Tale";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";

type Props = {};

export const DynamicForm = (props: Props) => {
  YupPassword(yup);

  const [user,setUser] = useAtom(userAtom);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [type, setType] = useState<"sign-in" | "sign-up">("sign-in");
  const [validationError, setValidationError] =
    useState<yup.ValidationError | null>(null);

  const router = useRouter()

  const authSchema = () => {
    let passwordValidation = string().min(8).required();
    let authObject = {
      email: string().email().required(),
    };


    return object(
      type === "sign-up"
        ? {
            ...authObject,
            name: string().min(3).required(),
            password: passwordValidation.password(),
          }
        : {
            ...authObject,
            password: passwordValidation,
          },
    );
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    try {
      const inputs = e.target.elements;
      let forValidation = {
        name: inputs.name?.value,
        email: inputs.email?.value,
        password: inputs.password?.value,
        confirmPassword: inputs.ConfirmPassword?.value,
      };
      if (
        type === "sign-up" &&
        forValidation.confirmPassword !== forValidation.password
      ) {
        throw new Error("Passwords do not match");
      }
      authSchema()
        .validate(forValidation)
        .then(async () => {
          const { data } = await Api.post(`auth/${type}`, forValidation);
          if (data?.error) {
            tell(data.error, 'error')
            return
          }
          setUser(data.user);
          if (type == "sign-in") router.push('/');
          tell(data.message)
        })
        .catch((error: yup.ValidationError) => {
          setValidationError(error);
          return
        });
    } catch (error: any) {
      setValidationError(error);
    }
  };

  return (
    <form
      className="text-foreground flex w-full flex-col justify-center gap-1"
      action={`/auth/${type}`}
      method="post"
      onSubmit={(e) => handleSubmit(e)}
    >
      {type === "sign-up" && (
        <div className="flex flex-col gap-1">
          <label className="text-md" htmlFor="name">
            Name
          </label>
          <section className="mb-6">
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
              name="name"
              placeholder="Mary Popins"
              required
            />
          </section>
        </div>
      )}
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <section className="mb-6">
        <input
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
          name="email"
          placeholder="you@example.com"
        />
      </section>
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <section className="relative mb-6 flex items-center justifny-between">
        <input
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          required
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
      {type === "sign-up" && (
        <div className="flex flex-col gap-1">
          <label className="text-md" htmlFor="Confirm password">
            Confirm Password
          </label>
          <section className="relative mb-6 flex items-center justify-between ">
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              name="ConfirmPassword"
              required
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
      )}
      <p className="text-sm">
        {(type === "sign-in" ? "Not a user?" : "Login User?") + " "}
        <button
          className="text-blue-400"
          type="button"
          onClick={() => {
            type === "sign-in" ? setType("sign-up") : setType("sign-in");
          }}
        >
          {type === "sign-in" ? "sign-up" : "sign-in"}
        </button>
      </p>
      <button className="mb-2 rounded bg-secondary px-4 py-2 text-text">
        {type}
      </button>
      <Messages validationError={validationError} />
    </form>
  );
};
