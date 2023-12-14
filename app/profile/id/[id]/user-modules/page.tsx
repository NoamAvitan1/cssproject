import { UserModules } from "./UserModules";

type Props = {

};

export default function page(props: Props){
  
  return (
    <div className="w-full flex flex-col mt-8 items-center space-y-6">
         <UserModules/>
    </div>
  );
};
