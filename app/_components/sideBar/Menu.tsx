'use client'
import { MdHome } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { SideBarMenu } from "./SideBarMenu";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";

type Props = {

};

export const Menu = (props: Props) => {
    const [user, setUser] = useAtom(userAtom);
    const id = user?.id; 

    const sideBarItems  = [
        {label: "Home", path: '/' ,icon: <MdHome/>},
        {label: "Profile", path: `/profile/${id}` ,icon: <FiUser/>},
        {label: "test", path: '/test' ,icon: <MdHome/>},
    ]
  return (
    <div>
        <SideBarMenu items = {sideBarItems}/>
    </div>
  );
};
