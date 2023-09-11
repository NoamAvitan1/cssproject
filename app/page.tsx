import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Greeting } from './_components/Greeting'
import LogoutButton from './_components/LogoutButton'
import { GithubLoginButton } from './_components/GithubLoginButton'

export default async function Index() {

  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className=''>
      {user && <Greeting user={user} />}
      <LogoutButton />
      <GithubLoginButton />
    </div>
  )
}
