import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
type Props = {
  flag : boolean;
  setFlag : React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchBar: React.FC<Props> = (props) => {
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
  return (
    <div className={`${props.flag ? 'flex' : 'hidden xs:flex'} w-full max-w-[600px] items-center justify-center justify-self-center`}>
      <div className="flex w-11/12  items-center justify-center overflow-hidden rounded-lg border-2 border-aura bg-background">
        <figure onClick={()=>props.setFlag(!props.flag)} className="p-2 cursor-pointer">
          <AiOutlineSearch />
        </figure>
        <input
          className="w-full rounded-r-md border-l border-l-aura bg-transparent p-1 focus:outline-none "
          type="text"
          placeholder="search"
        />
      </div>
    </div>
  );
};
