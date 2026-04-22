"use client"

import { useAuth } from "@/context/AuthContext"
import Navbar from "@/components/ui/navbar"
import Hero from "@/components/ui/home"

export default function Page() {
  const { initialized } = useAuth()

  if (!initialized) return null

  return (
    <>
      <div className="max-w-6xl mx-auto overflow-hidden">
        <Navbar />
        <Hero />
      </div>
    </>
  )
}
