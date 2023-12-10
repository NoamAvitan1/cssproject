import { TaleType } from "./Tale";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { HiOutlineXCircle } from "react-icons/hi2";
import { HiInformationCircle } from "react-icons/hi2";

type Props = {
  text: string;
  type: TaleType;
};

export const TaleComponent = ({ text, type }: Props) => {
  const bg = {
    normal: "border-text text-text",
    success: "border-success text-success",
    error: "border-error text-error",
    alert: "border-alert text-alert",
  };

  const icon = {
    normal: "",
    success: <HiOutlineCheckCircle className="w-8 h-8" />,
    error: <HiOutlineXCircle className="w-8 h-8" />,
    alert: <HiInformationCircle className="w-8 h-8" />,
  };

  return (
    <div className={"w-full flex whitespace-nowrap items-center bg-background justify-between border rounded-sm px-4 h-12 text-lg font-bold " + bg[type]}>
      <p>{text}</p>
      <span>{icon[type]}</span>
    </div>
  );
};
