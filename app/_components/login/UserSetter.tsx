'use client'

import { useAtom } from "jotai"
import { userAtom } from "../../_jotai/userAtoms"
import { User } from "@supabase/supabase-js"
import { useEffect } from "react"

export const UserSetter = ({ user: currentUser }: { user: User | null }) => {
  const [user, setUser] = useAtom(userAtom)
   //console.log(user);
  
  useEffect(() => {
    setUser(currentUser)
  }, [])

  return <></>
}
