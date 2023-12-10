import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const body = await request.json()
  const email = body.email
  const password = body.password
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  console.log(data, error)

  if (error) {
    return NextResponse.json({error: error.message})    
  }

  return NextResponse.json({message: "Please check your email address"})
}