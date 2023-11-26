'use client'
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

type Props = {
    items: sideBarItemsProps[]
};

interface sideBarItemsProps {
    id:number;
    label:string;
    path:string;
    icon: React.ReactElement<IconType>;
}

export const SideBarMenu = (props: Props) => {
    const router = useRouter();
  return (
    <div className="w-52">
    <section className="w-11/12">
            {props.items.map((item)=>(
                <ul onClick={()=>router.push(`${item.path}`)} key={item.id} className="flex items-center border-r-2 gap-2 py-2 pl-2 hover:bg-slate-200 cursor-pointer">
                    <li className="">{item.icon}</li>
                    <li>{item.label}</li>
                </ul>
            ))}
    </section>
    </div>
  );
};
