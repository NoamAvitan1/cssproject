import { FaCloud } from "react-icons/fa";
import { GiFlamingo, GiGrass, GiHighGrass, GiHummingbird } from "react-icons/gi";

type Props = {

};

export default function Loading (props: Props) {

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
      <div className="h-[150px] md:h-[250px] lg:h-[350px] aspect-square rounded-full animate-spin border-t border-t-blue-500">

      </div>
    </div>
  );
};
