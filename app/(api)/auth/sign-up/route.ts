import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const data = await request.json()
  const email = data.email
  const password = data.password
  const supabase = createRouteHandlerClient({ cookies })

  const requestUrl = new URL(request.url)
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data: {
        email: data.email,
        user_name: data.name,
        role: 'some role',
        profile_pic: null,
        ways_of_contact: 'some-contact@example.com',
      },
    },
  })

  const res = NextResponse

  if (error) {
    return res.json({error: error.message})    
  }

  return NextResponse.json({message: "Please check your email address"})
}
