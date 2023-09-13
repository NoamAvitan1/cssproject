'use client'

import { useSearchParams } from 'next/navigation'

export default function Messages() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  return (
    <>
      {error && (
        <p className="mt-4 p-4 bg-error text-white text-center">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 p-4 bg-success text-white text-center">
          {message}
        </p>
      )}
    </>
  )
}
