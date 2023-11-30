import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { Database } from '@/types/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: Request, route: any) {

  //   const supabase = createRouteHandlerClient<Database>({ cookies })
  console.log("req: ", route.params.id)
  //   const { data, error } = await supabase
//   .from('profile')
//   .update(req)
//   .select()  console.log(data)
  return NextResponse.json('yoyoyo')
}