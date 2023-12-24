'use client'

import { SingleModule } from "@/app/_module/SingleModule";
import { useParams } from "next/navigation";

type Props = {

};

export const SendParams = (props: Props) => {
    const {id} = useParams()
  return (
    <div>
        <SingleModule id={}/>
    </div>
  );
};
