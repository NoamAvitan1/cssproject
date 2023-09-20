import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import LogoutButton from './_components/login/LogoutButton'
import { AddModule } from './_module/AddModule'

export default async function Index() {

  return (
    <div className=''>
      <AddModule/>
    </div>
  )
}
