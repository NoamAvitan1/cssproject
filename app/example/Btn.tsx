'use client'
import supabase from "@/utils/supabaseConnection";

export const Btn = () => {

const handleClick = async () => {
    await supabase.from('profile').insert({
      name: 'lee',
      role: 'admin'
    }).then(data => console.log(data))
  }

  return (
    <button onClick={handleClick}>
        CLICKME
    </button>
  )
}
