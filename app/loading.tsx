import { FaCloud } from "react-icons/fa";
import { GiFlamingo, GiGrass, GiHighGrass, GiHummingbird } from "react-icons/gi";

type Props = {

};

export default function Loading (props: Props) {

  return (
    <div className="fixed inset-0 flex w-full flex-col items-center justify-center backdrop-blur scale-75 sm:scale-100 lg:scale-125 xl:scale-150">
      <div id="scene" className="relative rounded-l-full rounded-b-full overflow-hidden">
        <div
          id="loader-letters"
          className="relative flex items-center justify-center text-[15rem] text-blue-500"
        >
          <span className="relative">
            C
            {/* <GiHummingbird
              id="humming-bird"
              className="absolute top-1/4 z-20 text-4xl text-amber-600"
            /> */}
          </span>
          <span>S</span>
          <span>S</span>
        </div>
        <div
          id="sky"
          className="absolute left-0 right-0 top-20 borde border-sky-700"
        >
          <div
            id="sun"
            className="spin-8 absolute -top-4 right-12 -z-10 h-12 w-16 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-300 to-sky-300 blur-lg"
          ></div>
          <div id="clouds" className="relative w-full overflow-x-clip text-white">
            <FaCloud className="text-5xl absolute top-10" />
            <FaCloud className="text-4xl a-delay-10000 absolute -top-4" />
            <FaCloud className="text-7xl a-delay-5000" />
          </div>
        </div>
        <div id="ground" className="relative bottom-32 text-6xl">
          {/* <div id="ball" className="absolute w-4 h-4 bg-black"></div> */}
          <GiFlamingo
            id="flamingo"
            className="absolute bottom-0 right-[30%] text-red-400"
          />
          <div id="grass" className="relative left-8 z-10 flex [&_*]:relative">
            <GiGrass className="text-green-600" />
            <GiGrass className="rattle-2 -left-2 text-green-700" />
            <GiGrass className="-left-4 text-green-600" />
            <GiGrass className="-left-6 text-green-700" />
            <GiGrass className="rattle-1-6 -left-8 text-green-600" />
            <GiGrass className="-left-10 text-green-600" />
            <GiGrass className="rattle-1-4 -left-12 text-green-600" />
            <GiGrass className="-left-14 text-green-700" />
            <GiGrass className="-left-16 text-green-700" />
          </div>
          <div className="!absolute bottom-0 left-0 right-0 flex justify-around">
            <GiHighGrass className="rattle-1.8 text-green-800 a-delay-300" />
            <GiHighGrass className="rattle-2 text-green-900" />
            <GiHighGrass className="rattle-1-6 text-green-800" />
          </div>
        </div>
      </div>
    </div>
  );
};
