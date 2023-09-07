import supabase from "@/utils/supabaseConnection";

export const revalidate = 0;

export default async function page() {
//   const { data: modules, error } = await supabase.from("modules").select("*");

let user_id = "1ec38e46-69ac-4041-9982-e92b735beef6"
let { data: user, error } = await supabase
.from('modules')
.select(`
  *,
  users (
    *
  )
`)
// .eq('user_id', user_id) // replace userId with the actual user id

console.log(user);

  return (
    <div className="">
      {/* {modules?.map((m, i) => (
        <div className="bg-slate-500" key={i}>
          <p>{m.title}</p>
          <p>{}</p>
        </div> */}
      {/* ))} */}
    </div>
  );
}
