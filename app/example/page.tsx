import supabase from "@/utils/supabaseConnection";
import { Btn } from './Btn'

export const revalidate = 0;

export default async function page() {
//   const { data: modules, error } = await supabase.from("modules").select("*");

// const { data: modules, error } = await supabase
// .from('module')
// .select(`
//   *,
//   profile (
//     *
//   )
// `)

const { data: profiles, error } = await supabase.from('profile').select()

console.log(profiles)

  return (
    <div className="bg-white">
      <Btn />
    </div>
  );
}
