'use client'

import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo'
import { CartProvider } from '@/store/cart'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <CartProvider>
        {children}
      </CartProvider>
    </ApolloProvider>
  )
}
