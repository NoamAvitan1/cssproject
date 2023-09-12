'use client'

import { useAtom } from "jotai"
import { userAtom } from "../_jotai/userAtoms"

export const Greeting = () => {

  const [user, setUser] = useAtom(userAtom)

  return (
    <div className='bg-secondary space-y-4'>
      <h1>Greetings! Mr {user?.user_metadata.user_name}</h1>
    </div>
  )
}
