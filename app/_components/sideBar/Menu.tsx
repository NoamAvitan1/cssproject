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
        {id:1, label: "Home", path: '/' ,icon: <MdHome/>},
        {id:2, label: "Profile", path: `/profile/${id}` ,icon: <FiUser/>},
        {id:3, label: "test", path: '/test' ,icon: <MdHome/>},
    ]
  return (
    <div>
        <SideBarMenu items = {sideBarItems}/>
    </div>
  );
};
