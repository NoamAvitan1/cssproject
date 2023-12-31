import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
type Profile = Database["public"]["Tables"]["profile"]["Row"];
type Module = Database["public"]["Tables"]["module"]["Row"];

type Props = {
  flag: boolean;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchBar = (props: Props) => {
  const supabase = createClientComponentClient();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [inputQuery, setInputQuery] = useState<string>("");
  const ref: any = useRef();
  const router = useRouter();

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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.value) return;
    setInputQuery(e.target.value);

    const [profileData, moduleData] = await Promise.all([
      await supabase
        .from("profile")
        .select("*")
        .textSearch("user_name", inputQuery)
        .limit(4),
      await supabase
        .from("module")
        .select("*")
        .textSearch("title_description", "`" + inputQuery + "`")
        .limit(6),
    ]);
    if (!profileData.error && !moduleData.error) {
      if (!profileData.error) setProfiles(profileData.data);
      if (!moduleData.error) setModules(moduleData.data);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (!input) return;
    let query = input.value;
    if (e.key === "Enter" && query !== "") {
      navigate(query);
      input.value = '';
    }
  };

  const navigate = (query: string) => {
    router.push(`/search?s=${query}&mp=0&up=0`);
    if (!ref.current.value) return;
    ref.current.value = "";
  };

  // useEffect(() => {
  //   ref.current.value = ''
  // }, [])

  return (
    <div
      className={`${
        props.flag ? "flex" : "hidden xs:flex"
      } col-span-2 w-full max-w-[800px] items-center justify-center justify-self-center xl:col-span-3`}
    >
      <div className="flex w-11/12  items-center justify-center overflow-hidden rounded-lg border-2 border-aura bg-background">
        <figure
          onClick={() => {
            props.setFlag(!props.flag), navigate(inputQuery);
          }}
          className="cursor-pointer p-2"
        >
          <AiOutlineSearch />
        </figure>
        <input
          ref={ref}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          className="w-full rounded-r-md border-l border-l-aura bg-transparent p-1 focus:outline-none "
          type="text"
          placeholder="search"
        />
      </div>
    </div>
  );
};
