"use client";
import { useRouter } from "next/navigation";
import { MdHome } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";
import { SiAtom } from "react-icons/si";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { tell } from "../teller/Tale";

type Props = {
  toggle?: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

interface INavItem {
  label: string;
  onClick?: Function;
  icon: React.ReactElement<any, any>;
  guard: () => boolean;
  classes?: string;
}

export const SideBarMenu = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const id = user?.id;
  const supabase = createClientComponentClient();

  const items: Array<INavItem> = [
    {
      label: "Sign up",
      onClick: () => navigate("/login"),
      icon: <FiUser />,
      guard: () => (user ? false : true),
    },
    {
      label: "Home",
      onClick: () => navigate("/"),
      icon: <MdHome />,
      guard: () => true,
    },
    {
      label: "Profile",
      onClick: () => navigate(`/profile/id/${id}`),
      icon: <FiUser />,
      guard: () => (user ? true : false),
    },
    {
      label: "test",
      onClick: () => navigate("/test"),
      icon: <MdHome />,
      guard: () => true,
    },
    {
      label: "Create",
      onClick: () => navigate("/new"),
      icon: <SiAtom />,
      guard: () => true,
    }
    // {
    //   label: "Sign out",
    //   onClick: () => signOut(),
    //   icon: <HiArrowLeftOnRectangle />,
    //   guard: () => (user ? true : false),
    // },
  ];

  const navigate = (path: string) => {
    router.push(`${path}`);
    if (props.setToggle) props.setToggle(!props.toggle);
  };

  // const signOut = async () => {
  //   try {
  //     await supabase.auth.signOut();
  //     tell("Signed out successfully", "success");
  //   } catch (error: any) {
  //     tell(error.message, "error");
  //   }
  // };

  return (
    <aside className="">
      <ul className="w-full xs:mt-5">
        {items.map(
          (item, i) =>
            item.guard() && (
              <li
                onClick={() => item.onClick && item.onClick()}
                key={i}
                className={
                  "flex cursor-pointer items-center gap-2 whitespace-nowrap p-2 pr-10 text-lg hover:bg-secondary xl:text-xl " +
                  item?.classes
                }
              >
                <span className="">{item.icon}</span>
                <span>{item.label}</span>
              </li>
            ),
        )}
      </ul>
    </aside>
  );
};
