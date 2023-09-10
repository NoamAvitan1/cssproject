'use client'
import React, { useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { useAtom } from 'jotai'
import { userAtom } from '../_jotai/userAtoms'

export const Greeting = ({ user: currentUser }: { user: User }) => {

  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    setUser(currentUser)
  }, [])

  return (
    <div className='bg-background'>Greetings! Mr {currentUser?.user_metadata.name}</div>
  )
}
