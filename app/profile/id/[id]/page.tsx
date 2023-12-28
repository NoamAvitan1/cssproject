import { RecentPurchase } from "@/app/_components/profile/RecentPurchase";
import { UserData } from "../../../_components/profile/UserData";
import { SensitiveInfo } from "@/app/_components/profile/SensitiveInfo";
import { SignOutBtn } from "@/app/_components/profile/SignOutBtn";

export const revalidate = 0

export default function Profile() {
  return (
    <article className="flex w-full justify-center">
      <div className="flex w-11/12 flex-col items-center gap-6 py-8">
        <UserData />
        <RecentPurchase/>
        <SensitiveInfo />
        <SignOutBtn />
      </div>
    </article>
  );
}
