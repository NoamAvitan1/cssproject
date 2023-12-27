import { Modal } from "../common/Modal";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Bucket } from "../test/Bucket";
import { Profile } from "@/types/Profile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { profileAtom } from "@/app/_jotai/userAtoms";
import { tell } from "../teller/Tale";

type Props = {
  profile: Profile;
  setProfile: Function;
};

export const EditPic = (props: Props) => {
  const [globalUserProfile, setGlobalUserProfile] = useAtom(profileAtom)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const supabase = createClientComponentClient();
  
  const onChange = async (url: string) => {
    const { data, error } = await supabase
      .from("profile")
      .update({ profile_pic: url})
      .eq("id", props.profile?.id)
      .select();
    if (error) {
      tell('An error occurred, please try again later', 'error')
      return
    }
    props.setProfile({ ...props.profile, profile_pic: url });
    setGlobalUserProfile({ ...props.profile, profile_pic: url });
  };

  
  return (
    <>
      <button
        className="absolute right-1 top-1 rounded-full bg-secondary p-2 text-xl"
        onClick={() => setIsOpen(true)}
      >
        <MdOutlineEdit className="" />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="h-[450px] w-[450px] rounded-md bg-white">
          <Bucket onChange={onChange} setIsOpen={setIsOpen} />
        </div>
      </Modal>
    </>
  );
};
