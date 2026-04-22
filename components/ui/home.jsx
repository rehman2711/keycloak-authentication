"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Home() {
  const { authenticated } = useAuth()
  const router = useRouter()

  return (
    <section className="my-auto flex h-screen flex-col items-center justify-center px-6 pt-20 pb-32 text-center">
      <h1 className="max-w-4xl text-4xl leading-tight font-semibold md:text-6xl">
        <span className="text-brand">Authentication & Authorization</span> made
        simple
      </h1>

      <p className="mt-6 max-w-2xl text-muted-foreground">
        Secure your applications with Keycloak. Manage users, roles, and access
        control with seamless login, SSO, and enterprise-grade identity
        management.
      </p>

      <div className="mt-8 flex gap-4">
        {!authenticated ? (
          <>
            <Button className="bg-brand text-brand-foreground">
              Login with Keycloak
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                router.push("https://www.keycloak.org/")
              }}
            >
              Learn More
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              router.push("/dashboard")
            }}
          >
            Go to Dashboard
          </Button>
        )}
      </div>
    </section>
  )
}
