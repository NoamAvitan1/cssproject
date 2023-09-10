import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Greeting } from './_components/Greeting'

export default async function Index() {

  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className='bg-slate-200'>
      {user && <Greeting user={user} />}
    </div>
  )
}
