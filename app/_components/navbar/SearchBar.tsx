"use client";
import { AiOutlineSearch } from "react-icons/ai";
type Props = {};

export const SearchBar: React.FC<Props> = (props) => {
  return (
    <div className="col-span-2  flex w-full max-w-[600px] items-center justify-center justify-self-center overflow-hidden rounded-lg border-2 border-aura bg-background">
      <figure className="p-2">
        <AiOutlineSearch />
      </figure>
      <input
        className="w-full rounded-r-md border-l border-l-aura bg-transparent p-1 focus:outline-none "
        type="text"
        placeholder="search"
      />
    </div>
  );
};
