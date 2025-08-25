import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { SEARCH_PRODUCTS_QUERY } from '../lib/queries'
import { useChannel } from './useChannel'

export function useProductSearch(initialQuery: string = '') {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const channel = useChannel()

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const { data, loading, error, refetch } = useQuery(SEARCH_PRODUCTS_QUERY, {
    variables: {
      query: debouncedQuery,
      first: 20,
      channel
    },
    skip: !channel || !debouncedQuery.trim()
  })

  const products = data?.products?.edges || []
  const hasSearched = Boolean(debouncedQuery.trim())

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    products,
    loading,
    error,
    hasSearched,
    refetch
  }
}
