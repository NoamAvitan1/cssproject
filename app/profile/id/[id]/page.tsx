'use client'
import { useParams } from "next/navigation";
import { UserData } from "../../../_components/profile/UserData";
import { Recover } from "@/app/_components/profile/Recover";

export default function Profile(){
    const params = useParams();
    return (
        <><UserData params = {params.id as string} />
        <Recover/>
        </>
    )
}