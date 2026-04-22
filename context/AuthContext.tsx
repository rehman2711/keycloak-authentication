"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import keycloak from "@/lib/keycloak"
import type { KeycloakInstance } from "keycloak-js"
import Loading from "@/components/ui/loading"

interface AuthContextType {
  keycloak?: KeycloakInstance
  authenticated: boolean
  initialized: boolean
  login: () => void
  logout: () => void
  token?: string
}

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  initialized: false,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [token, setToken] = useState<string | undefined>(undefined)

  useEffect(() => {
    let mounted = true

    const initKeycloak = async () => {
      try {
        const auth = await keycloak.init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri:
            window.location.origin + "/silent-check-sso.html",
          pkceMethod: "S256",
          checkLoginIframe: false,
        })

        if (!mounted) return

        setAuthenticated(auth)
        setToken(keycloak.token)
        setInitialized(true)

        keycloak.onTokenExpired = () => {
          keycloak
            .updateToken(30)
            .then((refreshed) => {
              if (refreshed) {
                setToken(keycloak.token)
              }
            })
            .catch(() => {
              logout()
            })
        }
      } catch (err) {
        console.error("Keycloak init failed:", err)
        setInitialized(true)
      }
    }

    initKeycloak()

    return () => {
      mounted = false
    }
  }, [])

  const login = () => {
    keycloak.login({
      redirectUri: window.location.origin + "/dashboard",
    })
  }

  const logout = () => {
    keycloak.logout({
      redirectUri: window.location.origin + "/",
    })
  }

  const value = useMemo(
    () => ({
      keycloak,
      authenticated,
      initialized,
      login,
      logout,
      token,
    }),
    [authenticated, initialized, token]
  )

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
          <Loading />
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
