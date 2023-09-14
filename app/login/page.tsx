"use client";
import Link from "next/link";
import Messages from "./messages";
import { ProviderSignInButton } from "../_components/ProviderSignInButton";
import * as MaterialDesign from "react-icons/ai";
import { BaseSyntheticEvent, useState } from "react";
import { object, string } from "yup";
import * as yup from 'yup'
import YupPassword from "yup-password";

export default function Login() {
  
  YupPassword(yup)

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [type, setType] = useState<"sign-in" | "sign-up">("sign-in");
  const [validationError, setValidationError] = useState<yup.ValidationError | null>(null)

  const authSchema = object({
    email: string().email().required(),
    password: string().min(8).password().required()
  })

  const handleSubmit = (e: BaseSyntheticEvent) => {
    const inputs = e.target.elements
    const forValidation = {
      email: inputs[0]?.value,
      password: inputs[1]?.value
    }
    authSchema.validate(forValidation)
    .catch((error: yup.ValidationError) => {
      e.preventDefault()
      setValidationError(error)
    })
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <section className="flex flex-col gap-4">
        <ProviderSignInButton />
        <div className="text-text flex min-[420px]:justify-between justify-center items-center w-full">
          <span className="grow bg-slate-500 h-[2px]"></span>
          <p className="px-4 flex">
            Or
            <span className="hidden min-[400px]:block whitespace-pre">
              with email and password
            </span>
          </p>
          <span className="grow bg-slate-500 h-[2px]"></span>
        </div>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action={`/auth/${type}`}
          method="post"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <section className="rounded-md border mb-6 flex justify-between items-center relative">
            <input
              className="p-2 w-full"
              name="email"
              placeholder="you@example.com"
            />
            <span className="absolute right-2.5">
              {<MaterialDesign.AiOutlineMail />}
            </span>
          </section>
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <section className="rounded-md border mb-6 flex justify-between items-center relative">
            <input
              className="p-2 w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              required
            />
            <span className="absolute right-2.5 cursor-pointer">
              {showPassword ? (
                <MaterialDesign.AiOutlineEye
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <MaterialDesign.AiOutlineEyeInvisible
                  onClick={() => setShowPassword(true)}
                />
              )}{" "}
            </span>
          </section>
          <button className="bg-secondary border border-primary rounded px-4 py-2 text-text mb-2">
            {type}
          </button>
          <Messages validationError={validationError} />
        </form>
      </section>
    </div>
  );
}
