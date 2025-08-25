'use client'

import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../lib/apollo'
import { CartProvider } from '../store/cart'
import { AuthProvider } from './AuthProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}
