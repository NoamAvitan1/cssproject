'use client'
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { MdOutlineEdit } from "react-icons/md";


type Props = {};

export const UserData = (props: Props) => {
  const [user, setUser] = useAtom(userAtom);

  return <div className="[&_*]:border border-black md:w-3/4 flex justify-center items-center container">
    <article className="mt-10 container md:max-w-[66%] flex justify-center items-center">
      {user &&
        <section className="w-2/3 flex flex-col justify-center items-center relative">
          <MdOutlineEdit className="absolute top-0 right-0 text-black" />
          <img className="w-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
        </section>
      }
    </article>
  </div>;
};
