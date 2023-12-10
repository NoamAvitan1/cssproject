import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const reqData = await request.json()
  const email = reqData.email
  const password = reqData.password
  const supabase = createRouteHandlerClient({ cookies })

  const requestUrl = new URL(request.url)
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data: {
        email: reqData.email,
        user_name: reqData.name,
        role: 'some role',
        profile_pic: null,
        ways_of_contact: 'some-contact@example.com',
      },
    },
  })

  if (error) {
    return NextResponse.json({error: error.message})    
  }

  return NextResponse.json({message: "Please check your email address"})
}
