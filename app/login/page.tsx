"use client";
import Link from "next/link";
import Messages from "./messages";
import { ProviderSignInButton } from "../_components/ProviderSignInButton";
import * as MaterialDesign from "react-icons/ai";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassord] = useState<boolean>(false);
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
        <div className="text-slate-500 flex min-[420px]:justify-between justify-center items-center w-full">
          <span className="min-[420px]:block hidden w-[75px] h-[2px] bg-slate-500"></span>
          <span>Or with email and password</span>
          <span className="min-[420px]:block hidden w-[75px] h-[2px] bg-slate-500"></span>
        </div>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <section className="rounded-md border mb-6 flex justify-between items-center relative">
            <input
              className="p-2 w-full"
              name="email"
              placeholder="you@example.com"
              required
            />
            <span className="absolute right-2.5">{<MaterialDesign.AiOutlineMail/>}</span>
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
                  onClick={() => setShowPassord(false)}
                />
              ) : (
                <MaterialDesign.AiOutlineEyeInvisible
                  onClick={() => setShowPassord(true)}
                />
              )}{" "}
            </span>
          </section>
          <button className="bg-accent rounded px-4 py-2 text-white mb-2">
            Sign In
          </button>
          <button
            formAction="/auth/sign-up"
            className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
          >
            Sign Up
          </button>
          <Messages />
        </form>
      </section>
    </div>
  );
}
