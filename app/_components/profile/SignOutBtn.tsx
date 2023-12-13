import { useSignOut } from "@/app/_hooks/useLogOut";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

type Props = {

};

export const SignOutBtn = (props: Props) => {
    const params = useParams();
    const [user, setUser] = useAtom(userAtom)

    const handleClick = async () => {
        await useSignOut(() => setUser(null))
    }

  return (
    user?.id === params.id && ( <button onClick={handleClick} className="w-full p-2 flex items-center gap-2 justify-center bg-secondary">
        Sign Out <HiOutlineArrowLeftOnRectangle />
    </button>)
  );
};
