import { Logo } from '../_components/common/Logo';
import { ThemeChangeButton } from '../_components/common/ThemeChangeButton(out)';
import { NotificationsButton } from '../_components/navbar/NotificationsButton';
import { ProfileButton } from '../_components/navbar/ProfileButton';
import { SearchBar } from '../_components/navbar/SearchBar';



type Props = {

};

export const NavBar: React.FC<Props> = (props) => {


  return (
    <div className="relative w-full p-3 bg-secondary shadow grid grid-cols-4 px-4">
      <div className='max-w-[2rem]'>
        <Logo />
      </div>
      <SearchBar />
      <div className='flex justify-end items-center gap-10 text-2xl'>
        <ThemeChangeButton />
        <NotificationsButton />
        <ProfileButton/>
      </div>
</div>
);
};