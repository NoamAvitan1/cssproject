'use client'

import { useSearchParams } from 'next/navigation'
import { ValidationError } from 'yup'

export default function Messages({ validationError }: {validationError: ValidationError | null}) {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  return (
    <>
      {error || validationError && (
        <p className="mt-4 p-4 bg-error text-white text-center">
          {validationError?.message ?? error}
        </p>
      )}
      {!validationError && message && (
        <p className="mt-4 p-4 bg-success text-white text-center">
          {message}
        </p>
      )}
    </>
  )
}
