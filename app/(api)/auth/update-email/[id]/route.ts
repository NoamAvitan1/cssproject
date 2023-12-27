import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import { emaileSchema } from '@/app/_yup/moduleSchema'

export const dynamic = 'force-dynamic'

export async function POST(request: Request, route: { params: { id: string }}) {
  const requestUrl = new URL(request.url)
  const fd = await request.formData()
  const email = String(fd.get('email'));
  const user_id = route.params.id
  const supabase = createRouteHandlerClient<Database>({ cookies })
  try {
    await emaileSchema.validate(email);
    const { data, error } = await supabase.auth.updateUser({  
      email: email,
    })
    if (error) return NextResponse.redirect(requestUrl + '?error=Failed ot update user,please try again later',
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    })
    return NextResponse.redirect(requestUrl.origin + '/profile/id/' + user_id + '?success=Check your email for continue',
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    })
  } catch (error) {
      return NextResponse.redirect(requestUrl + '?error=Failed ot update user,please try again later',
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    })
  }

  

}