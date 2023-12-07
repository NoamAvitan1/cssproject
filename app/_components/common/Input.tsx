
type Props = {
    name: string
    label: string
    classes: string
};

export const Input = ({ name, label, classes }: Props) => {

  return (
    <div className="">
        {label && <label htmlFor={name}>{label}</label>}
        <input type="text" />
    </div>
  );
};
