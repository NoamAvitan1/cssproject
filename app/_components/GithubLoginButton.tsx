'use client'
import supabase from '@/utils/supabaseConnection'
import React from 'react'

export const GithubLoginButton = () => {

  return (
    <button onClick={async () => {
      const res = await supabase.auth.signInWithOAuth({
        provider: 'github',
    })
    }} className="bg-success py-2 px-4 rounded-md no-underline w-[200px]">
      Sign in with github
    </button>
  )
}
