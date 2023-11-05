import { pStopper } from "../../../utils/pStopper";
type Props = {
  isOpen: boolean;
  values: Array<string>;
  onSelect: (value: string) => void;
};

export const Menu = (props: Props) => {
    console.log(props.values)
  return (
    <div className="">
      <div className="absolute inset-0 bg-slate-500">
          {props.values.map((value, i) => (
            <span
              key={i}
              onClick={() => pStopper(props.onSelect(value))}
              className="cursor-pointer p-3"
            >
              {value}
            </span>
          ))}
      </div>
    </div>
  );
};
