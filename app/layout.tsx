import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import './globals.css'
import { cookies } from 'next/headers'
import { UserSetter } from './_components/login/UserSetter'
import { ThemeChangeButton } from './_components/common/ThemeChangeButton(out)'
import { NavBar } from './navbar/Navbar'

export const metadata = {
  title: 'CSStore',
  description: 'Find your CSS needs, all in one place',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()


  
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center text-text">
          <NavBar />
          <UserSetter user={user} />
          {children}
        </main>
      </body>
    </html>
  )
}
