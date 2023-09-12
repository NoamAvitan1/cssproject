'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

export const GithubLoginButton = () => {

  const supabase = createClientComponentClient()

  return (
    <button onClick={async () => {
      const res = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: '/'
        }
      })
    }}
    className="bg-success py-2 px-4 rounded-md no-underline w-[200px]">
      Sign in with github
    </button>
  )
}
