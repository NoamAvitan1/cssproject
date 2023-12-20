import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { Database } from '@/types/supabase'
import { moduleObject } from '@/app/_yup/moduleSchema'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const moduleData = await request.json()
  //console.log(moduleData)
  const supabase = createRouteHandlerClient<Database>({ cookies })
  try {
    await moduleObject.validate(moduleData)
    const { data, error } = await supabase.from('module').insert(moduleData).select()
    if (error) {
      return NextResponse.json(error)
    }
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(error)
  }

  // return NextResponse.json('yo')
}

