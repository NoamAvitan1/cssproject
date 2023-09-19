import { Logo } from '../_components/common/Logo';
import { ThemeChangeButton } from '../_components/common/ThemeChangeButton(out)';
import { NotificationsButton } from '../_components/navbar/NotificationsButton';
import { SearchBar } from '../_components/navbar/SearchBar';



type Props = {

};

export const NavBar: React.FC<Props> = (props) => {


  return (
    <div className="relative w-full p-3 bg-secondary shadow flex justify-between items-center px-4">
      <div className='max-w-[2rem]'>
        <Logo />
      </div>
      <SearchBar />
      <div className='flex justify-center items-center gap-5'>
      <NotificationsButton />
      <ThemeChangeButton />
      </div>
    </div>
  );
};
