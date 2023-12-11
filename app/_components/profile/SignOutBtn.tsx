import { useSignOut } from "@/app/_hooks/useLogOut";
import { userAtom } from "@/app/_jotai/userAtoms";
import { useAtom } from "jotai";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

type Props = {

};

export const SignOutBtn = (props: Props) => {

    const [user, setUser] = useAtom(userAtom)

    const handleClick = async () => {
        await useSignOut(() => setUser(null))
    }

  return (
    <button onClick={handleClick} className="w-full p-2 flex items-center gap-2 justify-center bg-secondary">
        Sign Out <HiOutlineArrowLeftOnRectangle />
    </button>
  );
};
