import supabase from "@/utils/supabaseConnection";
import { Btn } from './Btn'

export const revalidate = 0;

export default async function page() {
//   const { data: modules, error } = await supabase.from("modules").select("*");

let { data: user, error } = await supabase
.from('module')
.select(`
  *,
  profile (
    *
  )
`)

  return (
    <div className="bg-white">
      <Btn />
    </div>
  );
}
