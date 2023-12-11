import { CodeBlock } from "@/types/CodeBlock";

type Props = {
  index: number;
  handleCopy: Function;
  //   handleRename: Function;
  handleDelete: Function;
};

export const HeaderOptions = ({
  index,
  handleCopy,
  //   handleRename,
  handleDelete,
}: Props) => {
  return (
    <ul
      className={`absolute top-full z-10 flex w-full flex-col items-center justify-center bg-background text-sm duration-150`}
    >
      <li onClick={(e) => {e.stopPropagation(),handleCopy()}} className="w-full hover:bg-secondary">
        copy
      </li>
      {/* <li onClick={() => handleRename()} className="w-full hover:bg-secondary">rename</li> */}
      {index != 0 && <li
        onClick={(e) => {e.stopPropagation(), handleDelete()}}
        className="w-full text-error hover:bg-secondary"
      >
        delete
      </li>}
    </ul>
  );
};
