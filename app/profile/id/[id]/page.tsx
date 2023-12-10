'use client'
import { useParams } from "next/navigation";
import { UserData } from "../../../_components/profile/UserData";
import { PasswordUpdateButton } from "@/app/_components/profile/PasswordUpdateButton";
import { RecentModules } from "@/app/_components/profile/RecentModules";
import { EmailUpdateButton } from "@/app/_components/profile/EmailUpdateButton";
import { ChangeSensetiveFields } from "@/app/_components/profile/ChangeSensetiveFields";

export default function Profile(){

    return (
        <article className="w-full flex justify-center">
        <div className="flex flex-col items-center w-11/12 gap-8">
            <UserData />
            <RecentModules/>
            <ChangeSensetiveFields/>
        </div>
        </article>
    )
}