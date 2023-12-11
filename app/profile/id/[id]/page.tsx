"use client";
import { UserData } from "../../../_components/profile/UserData";
import { RecentModules } from "@/app/_components/profile/RecentModules";
import { SensitiveInfo } from "@/app/_components/profile/SensitiveInfo";
import { SignOutBtn } from "@/app/_components/profile/SignOutBtn";

export default function Profile() {
  return (
    <article className="flex w-full justify-center">
      <div className="flex w-11/12 flex-col items-center gap-8 py-8">
        <UserData />
        <SensitiveInfo />
        <SignOutBtn />
      </div>
    </article>
  );
}
