import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import LogoutButton from './_components/LogoutButton'
import { Greeting } from './_components/Greeting'

export default async function Index() {

  return (
    <div className=''>
       {/* <LogoutButton /> */}
      {/* <Greeting />  */}
    </div>
  )
}
