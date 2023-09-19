import { Logo } from '../_components/common/Logo';
import { ThemeChangeButton } from '../_components/common/ThemeChangeButton(out)';
import { Notifacation } from '../_components/navbar/Notifacation';
import { Search } from '../_components/navbar/Search';



type Props = {

};

export const NavBar: React.FC<Props> = (props) => {


  return (
    <div className="relative w-full p-3 bg-secondary shadow flex justify-between items-center px-4">
      <div className='max-w-[2rem]'>
        <Logo/>
      </div>
      <Search/>
      <div className='flex justify-center items-center gap-5'>
      <Notifacation/>
      <ThemeChangeButton/>
      </div>
    </div>
  );
};
