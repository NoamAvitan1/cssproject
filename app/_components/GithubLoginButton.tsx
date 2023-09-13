'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Provider } from '@supabase/supabase-js'
import React from 'react'
import * as MaterialDesign from 'react-icons/fc'
import {BsGithub} from 'react-icons/bs'
 
export const GithubLoginButton = () => {

  const supabase = createClientComponentClient()

  const signInWithThirdPary = async(authProvier:Provider) => {
    const res = await supabase.auth.signInWithOAuth({
      provider: authProvier,
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className='flex flex-col justify-between h-[100px]'>
      <section onClick={()=>signInWithThirdPary('github')} className='flex justify-between w-[220px] items-center border border-text p-2 rounded-md cursor-pointer shadow-sm hover:ring-2 hover:ring-slate-700 hover:ring-opacity-10 hover:duration-300'>
    <button
    className="">
      <BsGithub/>
    </button>
    <p>GitHub</p>
    </section>
    <section  onClick={()=>signInWithThirdPary('google')} className='flex justify-between w-[220px] items-center border border-text p-2 rounded-md cursor-pointer shadow-sm hover:ring-2 hover:ring-slate-700 hover:ring-opacity-10 hover:duration-300'>
    <button
    className="">
      <MaterialDesign.FcGoogle/>
    </button>
    <p>Google</p>
    </section>
    </div>
  )
}
