"use client";
import { useRouter } from "next/navigation";
import { MdHome } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms"
type Props = {
  
};


export const SideBarMenu = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const id = user?.id; 

  const items  = [
      {label: "Home", path: '/' ,icon: <MdHome/>},
      {label: "Profile", path: `/profile/${id}` ,icon: <FiUser/>},
      {label: "test", path: '/test' ,icon: <MdHome/>},
  ]
  return (
    <div className="w-52">
      <ul className="w-full xs:border-r-2 xs:border-secondary xs:mt-5">
        {items.map((item, i) => (
          <li
            onClick={() => router.push(`${item.path}`)}
            key={i}
            className="flex cursor-pointer items-center gap-2  p-2 hover:bg-secondary text-xl"
          >
            <span className="">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
