'use client'
import { useParams } from "next/navigation";

type Props = {

};

export default function page(props: Props){
  const params = useParams();
  console.log(params);
  return (
    <div>

    </div>
  );
};
