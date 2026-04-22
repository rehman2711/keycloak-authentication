"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { ModeToggle } from "@/components/theme-toggle-button"

export default function Navbar() {
  const { login, logout, authenticated } = useAuth()

  return (
    <header className="flex items-center justify-between px-8 py-4">
      <h2 className="scroll-m-20 text-2xl font-black tracking-tight first:mt-0">
        KEYCLOAK - AUTH{" "}
      </h2>

      <div className="flex gap-3">
        {!authenticated ? (
          <>
            <Button
              className="bg-brand text-brand-foreground hover:opacity-90"
              onClick={login}
            >
              Log in
            </Button>
          </>
        ) : (
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        )}
        <ModeToggle />
      </div>
    </header>
  )
}
