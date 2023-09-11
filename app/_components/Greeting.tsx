'use client'
import React, { useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { useAtom } from 'jotai'
import { userAtom } from '../_jotai/userAtoms'
import Api from '../../utils/axios'

export const Greeting = ({ user: currentUser }: { user: User }) => {

  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    setUser(currentUser)
  }, [])

  return (
    <div className='bg-secondary space-y-4'>
      <h1>Greetings! Mr {currentUser?.user_metadata.user_name}</h1>
    </div>
  )
}
