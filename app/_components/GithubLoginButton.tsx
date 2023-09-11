import React from 'react'

export const GithubLoginButton = () => {

  return (
    <form action="/auth/github-sign-in" method="post">
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Sign in with github
      </button>
    </form>
  )
}
