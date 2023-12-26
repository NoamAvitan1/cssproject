"use client";
import { useState } from "react";
import { UserModules } from "./UserModules";
import { useSearchParams } from "next/navigation";

type Props = {};

export const TypeModule = (props: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("modules");
  const [type, setType] = useState<"public" | "paid" | "all">("all");
  const handleChange = (type: "public" | "paid" | "all") => {
    setType(type);
  };
  return (
    <div className="flex w-full flex-col items-center space-y-6">
      <header className="flex w-10/12 gap-4 border-b border-text p-2">
      <h1 className="font-bold">{query && query !== "purchased-modules" ? 'Showing results for:' : 'Showing latest purchases'}</h1>
        {query && query !== "purchased-modules" && (
          <select
            onChange={(e) =>
              handleChange(e.target.value as "public" | "paid" | "all")
            }
            name=""
            id=""
            className="bg-transparent"
            defaultValue={"all"}
          >
            <option className="text-black" value="all">
              all
            </option>
            <option className="text-black" value="public">
              public
            </option>
            <option className="text-black" value="paid">
              paid
            </option>
          </select>
        )}
      </header>
      <UserModules type={type} />
    </div>
  );
};
