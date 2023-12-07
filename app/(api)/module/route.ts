import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { Database } from '@/types/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const moduleData = await request.json()
  // console.log(moduleData)
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data,error } = await supabase.from('module').insert(moduleData).select()
  console.log(error)
  return NextResponse.json(data)
}

