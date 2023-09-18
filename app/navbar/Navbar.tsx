import { Logo } from '../_components/common/Logo';
import { Search } from '../_components/navbar/Search';



type Props = {

};

export const NavBar: React.FC<Props> = (props) => {


  return (
    <div className="w-full h-[70px] bg-primary flex justify-between items-center px-4">
      <div className='w-[45px] h-[45px]'>
      <Logo/>
      </div>
      <Search/>
    </div>
  );
};
