"use client"

import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"

export default function Page() {
  const { login, logout, authenticated, initialized } = useAuth()

  // optional but correct: avoid flicker before init
  if (!initialized) return null

  return (
    <div>
      {!authenticated && (
        <Button className="mt-2" onClick={login}>
          Login
        </Button>
      )}

      {authenticated && (
        <Button className="mt-2" onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  )
}
