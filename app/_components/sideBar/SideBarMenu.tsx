"use client";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

type Props = {
  items: sideBarItemsProps[];
};

interface sideBarItemsProps {
  label: string;
  path: string;
  icon: React.ReactElement<IconType>;
}

export const SideBarMenu = (props: Props) => {
  const router = useRouter();
  return (
    <div className="w-52">
      <ul className="w-11/12">
        {props.items.map((item, i) => (
          <li
            onClick={() => router.push(`${item.path}`)}
            key={i}
            className="flex cursor-pointer items-center gap-2 border-r-2 p-2 hover:bg-slate-200"
          >
            <span className="">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
