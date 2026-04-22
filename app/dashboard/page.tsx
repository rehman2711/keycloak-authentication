"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/theme-toggle-button"

export default function DashboardPage() {
  const { keycloak, authenticated, token, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (authenticated === false) {
      router.push("/")
    }
  }, [authenticated, router])

  if (!authenticated) return null

  const tokenData = useMemo(() => {
    if (!token) return null
    try {
      return JSON.parse(atob(token.split(".")[1]))
    } catch {
      return null
    }
  }, [token])

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="min-h-screen space-y-6 bg-background px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-black tracking-tight sm:text-2xl">
            AUTH - DASHBOARD
          </h2>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
            <ModeToggle />
          </div>
        </div>

        <Separator />

        {/* GRID */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {/* PROFILE */}
          <Card className="rounded-none border">
            <CardHeader className="flex flex-row items-center gap-3 sm:gap-4">
              <Avatar className="h-10 w-10 rounded-none sm:h-12 sm:w-12">
                <AvatarImage src={"/default-avatar.png"} />
                <AvatarFallback className="rounded-none">
                  {tokenData?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <CardTitle className="truncate text-sm sm:text-base">
                  {tokenData?.preferred_username || "User"}
                </CardTitle>
                <p className="truncate text-xs text-muted-foreground sm:text-sm">
                  {tokenData?.email || "No email"}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 text-xs sm:text-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="text-muted-foreground">User ID</span>
                <span className="break-all">{tokenData?.sid || "-"}</span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="text-muted-foreground">Username</span>
                <span className="break-all">
                  {tokenData?.preferred_username || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <span className="text-muted-foreground">Application</span>
                <span className="break-all">{tokenData?.azp || "-"}</span>
              </div>
            </CardContent>
          </Card>

          {/* ROLES */}
          <Card className="rounded-none border">
            <CardHeader>
              <CardTitle>Roles & Access</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">
              {tokenData?.resource_access?.account?.roles?.length ? (
                tokenData.resource_access.account.roles.map(
                  (role: string, i: number) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="rounded-none text-xs sm:text-sm"
                    >
                      {role}
                    </Badge>
                  )
                )
              ) : (
                <span className="text-xs text-muted-foreground sm:text-sm">
                  No roles assigned
                </span>
              )}
            </CardContent>
          </Card>

          {/* SESSION */}
          <Card className="rounded-none border">
            <CardHeader>
              <CardTitle>Session Info</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Authenticated</span>
                <span>{authenticated ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Token Exp</span>
                <span>
                  {tokenData?.exp
                    ? new Date(tokenData.exp * 1000).toLocaleString()
                    : "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Issued At</span>
                <span>
                  {tokenData?.iat
                    ? new Date(tokenData.iat * 1000).toLocaleString()
                    : "-"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TOKEN DETAILS */}
        <Card className="rounded-none border">
          <CardHeader>
            <CardTitle>Token Details (Decoded)</CardTitle>
          </CardHeader>

          <CardContent>
            <pre className="max-h-72 overflow-auto bg-muted p-3 text-[10px] sm:max-h-80 sm:p-4 sm:text-xs">
              {tokenData ? JSON.stringify(tokenData, null, 2) : "No token data"}
            </pre>
          </CardContent>
        </Card>

        {/* ACTIONS */}
        <Card className="rounded-none border">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-wrap gap-3 sm:gap-4">
            <Button className="w-full rounded-none bg-brand text-brand-foreground sm:w-auto">
              Refresh Token
            </Button>

            <Button variant="outline" className="w-full rounded-none sm:w-auto">
              Manage Account
            </Button>

            <Button variant="outline" className="w-full rounded-none sm:w-auto">
              View Sessions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
