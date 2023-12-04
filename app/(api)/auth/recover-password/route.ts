import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const data = await request.json();
  const requestUrl = new URL(request.url)
  const user_id = requestUrl.searchParams.get('id');
  const supabase = createRouteHandlerClient({ cookies })
 try {
  await supabase.auth.resetPasswordForEmail(data.email);

  return NextResponse.redirect(`${requestUrl.origin}/profile/id/${user_id}?message=Check your email to continue`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  })
 } catch (error) {
  return NextResponse.redirect(`${requestUrl.origin}/profile/id/${user_id}?error=An error occured, please try again later`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  })
 }
}
