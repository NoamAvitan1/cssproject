"use client";
import { useRouter } from "next/navigation";
import { MdHome } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useEffect } from "react";
import { JsxElement } from "typescript";
type Props = {};

interface INavItem {
  label: string;
  path: string;
  icon: React.ReactElement<any, any>;
  guard: () => boolean;
}

export const SideBarMenu = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const id = user?.id;
  const items: Array<INavItem> = [
    {
      label: "Profile",
      path: `/profile/${id}`,
      icon: <FiUser />,
      guard: () => (user ? true : false),
    },
    { label: "Home", path: "/", icon: <MdHome />, guard: () => true },
    { label: "test", path: "/test", icon: <MdHome />, guard: () => true },
  ];
  return (
    <aside className="w-52">
      <ul className="w-full xs:mt-5 xs:border-r-2 xs:border-secondary">
        {items.map(
          (item, i) =>
            (item.guard() && (
              <li
                onClick={() => router.push(`${item.path}`)}
                key={i}
                className="flex cursor-pointer items-center gap-2  p-2 text-xl hover:bg-secondary"
              >
                <span className="">{item.icon}</span>
                <span>{item.label}</span>
              </li>
            )),
        )}
      </ul>
    </aside>
  );
};
