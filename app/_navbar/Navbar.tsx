import { Logo } from "../_components/common/Logo";
import { ThemeChangeButton } from "../_components/common/ThemeChangeButton";
import { NotificationsButton } from "../_components/navbar/NotificationsButton";
import { ProfileButton } from "../_components/navbar/ProfileButton";
import { SearchBar } from "../_components/navbar/SearchBar";

type Props = {};

export const NavBar: React.FC<Props> = (props) => {
  return (
    <div className="relative flex justify-between h-[5vh] min-h-[45px] w-full bg-secondary px-4 shadow">
      <div className="max-w-[2rem] flex items-center">
        <Logo />
      </div>
      <SearchBar />
      <div className="flex items-center justify-end gap-10 text-2xl">
        <ThemeChangeButton />
        <NotificationsButton />
        <ProfileButton />
      </div>
    </div>
  );
};
