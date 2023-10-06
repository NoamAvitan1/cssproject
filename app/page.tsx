import { AddModule } from "./_module/AddModule";
import Modules from "./_module/Modules";
import Packages from "./_package/Packages";


export default async function Index() {

  return (
    <div className='mt-10 w-full flex flex-col justify-center items-center gap-5'>
      <Packages/>
      <Modules/>
    </div>
  )
}
