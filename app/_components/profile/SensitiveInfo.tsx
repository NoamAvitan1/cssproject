'use client'
import { useState } from "react";
import { EmailUpdateButton } from "./EmailUpdateButton";
import { PasswordUpdateButton } from "./PasswordUpdateButton";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useParams } from "next/navigation";
import { useClient } from "@/app/_hooks/useClient";

type Props = {};

export const SensitiveInfo = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useAtom(userAtom);
  const isClient = useClient();
  const { id } = useParams();
  const provider = user?.app_metadata?.provider === 'email';

  return (
    isClient && user?.id === id && provider && (
      <section className="flex h-52 w-full flex-col items-center gap-4 border-4 border-double border-error p-4">
        <h1 className="text-center text-xl font-bold text-error">
          Warning: The actions below are irrevesible
        </h1>
        <PasswordUpdateButton />
        <button
          onClick={() => setIsOpen(true)}
          className="w-full border border-error p-2 text-lg duration-300 hover:border-black hover:bg-error hover:font-bold hover:text-black"
        >
          Change mail address
        </button>
        <EmailUpdateButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </section>
    )
  );
};
