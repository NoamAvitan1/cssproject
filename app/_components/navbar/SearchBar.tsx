import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
type Props = {
  flag : boolean;
  setFlag : React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchBar = (props: Props) => {
  const supabase = createClientComponentClient();

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

  const handleChange = async(e:any) => {
    const {data, error} = await supabase.from('profile').select('*').textSearch()
  } 


  return (
    <div className={`${props.flag ? 'flex' : 'hidden xs:flex'} col-span-2 xl:col-span-3 w-full max-w-[800px] items-center justify-center justify-self-center`}>
      <div className="flex w-11/12  items-center justify-center overflow-hidden rounded-lg border-2 border-aura bg-background">
        <figure onClick={()=>props.setFlag(!props.flag)} className="p-2 cursor-pointer">
          <AiOutlineSearch />
        </figure>
        <input onChange={(e)=>handleChange(e)}
          className="w-full rounded-r-md border-l border-l-aura bg-transparent p-1 focus:outline-none "
          type="text"
          placeholder="search"
        />
      </div>
    </div>
  );
};
