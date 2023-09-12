import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { useAtom } from 'jotai'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { userAtom } from './app/_jotai/userAtoms'

export async function middleware(req: NextRequest) {
    
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const session = await supabase.auth.getSession()

  // localStorage.setItem('session', JSON.stringify(session.data.session?.user ?? null))

  return res
}
