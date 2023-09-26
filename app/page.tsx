import { Modules } from "./_module/Modules";

export default async function Index() {

  return (
    <div className='mt-10 flex flex-col gap-5'>
      <label className="border-b-2 w-full text-2xl" htmlFor="">Popular Modules to Check Out</label>
      <Modules/>
    </div>
  )
}
