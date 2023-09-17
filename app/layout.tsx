import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import './globals.css'
import { cookies } from 'next/headers'
import { UserSetter } from './_components/UserSetter'
import { ThemeChangeButton } from './_components/ThemeChangeButton(out)'

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
        <main className="min-h-screen bg-background flex flex-col items-center justify-center text-text">
          <ThemeChangeButton />
          <UserSetter user={user} />
          {children}
        </main>
      </body>
    </html>
  )
}
