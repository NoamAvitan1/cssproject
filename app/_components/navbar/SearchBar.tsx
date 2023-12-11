import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
type Profile = Database['public']['Tables']['profile']['Row']
type Module = Database['public']['Tables']['module']['Row']

type Props = {
  flag: boolean;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchBar = (props: Props) => {
  const supabase = createClientComponentClient();
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [modules, setModules] = useState<Module[]>([])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 550) {
        props.setFlag(false);
      }
    };

    window.addEventListener("resize", () => handleResize());
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = async (e: any) => {
    if (!e?.target?.value) return;
    const query = e.target.value;

    const [profileData, moduleData] = await Promise.all([
      await supabase
      .from("profile")
      .select("*")
      .textSearch("user_name", query).limit(4),
      await supabase
      .from("module")
      .select("*")
      .textSearch('title_description', "`" + query + "`").limit(6),
    ])
    if(!profileData.error && !moduleData.error){
        if(!profileData.error) setProfiles(profileData.data);
        if(!moduleData.error) setModules(moduleData.data);
    }
  }
  console.log(modules);
  return (
    <div
      className={`${
        props.flag ? "flex" : "hidden xs:flex"
      } col-span-2 w-full max-w-[800px] items-center justify-center justify-self-center xl:col-span-3`}
    >
      <div className="flex w-11/12  items-center justify-center overflow-hidden rounded-lg border-2 border-aura bg-background">
        <figure
          onClick={() => props.setFlag(!props.flag)}
          className="cursor-pointer p-2"
        >
          <AiOutlineSearch />
        </figure>
        <input
          onChange={(e) => handleChange(e)}
          className="w-full rounded-r-md border-l border-l-aura bg-transparent p-1 focus:outline-none "
          type="text"
          placeholder="search"
        />
      </div>
    </div>
  );
};
