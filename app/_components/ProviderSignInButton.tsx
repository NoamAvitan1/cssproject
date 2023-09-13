"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
import React from "react";
import * as MaterialDesign from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

export const ProviderSignInButton = () => {
  const supabase = createClientComponentClient();

  const SignInWithAuthProvider = async (authProvier: Provider) => {
    const res = await supabase.auth.signInWithOAuth({
      provider: authProvier,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col justify-between items-center h-[100px] w-full">
      <button
        onClick={() => SignInWithAuthProvider("github")}
        className="flex justify-between w-full items-center font-serif text-slate-700 border border-slate-400 p-2 px-6 rounded shadow-sm hover:ring-[6px] ring-slate-700 ring-opacity-5 duration-150">
        <p>Sign In With GitHub</p>
        <BsGithub className="text-2xl" />
      </button>
      <button
        onClick={() => SignInWithAuthProvider("google")}
        className="flex justify-between w-full items-center font-serif text-slate-700 border border-slate-400 p-2 px-6 rounded shadow-sm hover:ring-[6px] ring-slate-700 ring-opacity-5 duration-150">
        <p>Sign In With Google</p>
        <MaterialDesign.FcGoogle className="text-2xl" />
      </button>
    </div>
  );
};
