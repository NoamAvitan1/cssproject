"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { UsersSearch } from "./UsersSearch";
import { ModulesSearch } from "./ModulesSearch";

type Props = {};

export const Search = (props: Props) => {
  const [type, setType] = useState<"users" | "modules">("modules");

  const router = useRouter();

  const searchParams = useSearchParams();

  const handleChange = (type: 'users' | 'modules') => {
    setType(type)
  }

  return <div className="mt-7 h-full w-full">
  <section className="flex justify-center gap-4">
    <header className="flex w-full gap-4 border-b p-2">
      <h1 className="font-bold">Showing results for:</h1>
      <select onChange={(e) => handleChange(e.target.value as 'users' | 'modules')}
        name=""
        id=""
        className="bg-transparent"
        defaultValue={"modules"}
      >
        <option className="text-black" value="modules">
          modules
        </option>
        <option className="text-black" value="users">
          users
        </option>
      </select>
    </header>
  </section>
  {type === "users" ? <UsersSearch /> : <ModulesSearch />}
</div>;
};
