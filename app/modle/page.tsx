import supabase from "@/utils/supabaseConnection";

export default async function Page() {
  const { data: module, error } = await supabase.from("module").select("*");
    console.log(module)
  return (
  <div className="my-auto text-foreground">
    {module?.map((m,i) => (
        <div key={i}>
            <p>{m.title}</p>
        </div>
    ))}
  </div>
  )
}
