'use client'

import { useEffect, ReactNode } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ME_QUERY, REFRESH_TOKEN_MUTATION } from '../lib/auth'
import { useAuthStore } from '../store/auth'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { token, refreshToken, isAuthenticated, setAuth, logout, setLoading } = useAuthStore()

  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION, {
    onCompleted: (data) => {
      const { token: newToken, user, errors } = data.tokenRefresh
      
      if (errors && errors.length > 0) {
        console.error('Token refresh failed:', errors)
        logout()
      } else if (newToken && user) {
        setAuth(user, newToken, refreshToken || undefined)
      }
    },
    onError: (error) => {
      console.error('Token refresh error:', error)
      logout()
    }
  })

  // Query user data if we have a token
  const { loading } = useQuery(ME_QUERY, {
    skip: !token || !isAuthenticated,
    onCompleted: (data) => {
      if (data.me && token) {
        setAuth(data.me, token, refreshToken || undefined)
      }
    },
    onError: (error) => {
      console.error('ME query error:', error)
      // Try to refresh token if ME query fails
      if (refreshToken) {
        refreshTokenMutation({ variables: { refreshToken } })
      } else {
        logout()
      }
    }
  })

  // Set up token refresh interval
  useEffect(() => {
    if (!token || !refreshToken) return

    // Refresh token every 30 minutes
    const interval = setInterval(() => {
      refreshTokenMutation({ variables: { refreshToken } })
    }, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [token, refreshToken, refreshTokenMutation])

  // Handle initial loading state
  useEffect(() => {
    if (isAuthenticated && token) {
      setLoading(loading)
    }
  }, [loading, isAuthenticated, token, setLoading])

  return <>{children}</>
}
