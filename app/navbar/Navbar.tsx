import { Logo } from '../_components/common/Logo';
import { ThemeChangeButton } from '../_components/common/ThemeChangeButton(out)';
import { Notifacation } from '../_components/navbar/Notifacation';
import { ProfileButton } from '../_components/navbar/ProfileButton';
import { Search } from '../_components/navbar/Search';



type Props = {

};

export const NavBar: React.FC<Props> = (props) => {


  return (
    <div className="w-full p-3 bg-secondary shadow  px-4 grid grid-cols-4">
      <div className='max-w-[2rem]'>
        <Logo/>
      </div>                                                                                                                                                      
      <Search/>
      <div className='flex justify-end items-center text-2xl gap-10'>
      <ThemeChangeButton/>
      <Notifacation/>
      <ProfileButton/>
      </div>
    </div>
  );
};
