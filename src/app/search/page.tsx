'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ProductCard } from '../../components/ProductCard'
import { SearchSuggestions } from '../../components/SearchSuggestions'
import { useProductSearch } from '../../hooks/useProductSearch'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''
  
  const {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    products,
    loading,
    error,
    hasSearched
  } = useProductSearch(initialQuery)

  // Update URL when search query changes
  useEffect(() => {
    if (debouncedQuery) {
      const params = new URLSearchParams()
      params.set('q', debouncedQuery)
      router.replace(`/search?${params.toString()}`, { scroll: false })
    } else if (hasSearched) {
      router.replace('/search', { scroll: false })
    }
  }, [debouncedQuery, router, hasSearched])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchQuery(searchQuery.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/products" 
            className="inline-flex items-center px-4 py-2 glass-dark text-white/90 rounded-xl hover:text-white hover:scale-105 transition-all duration-300 mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Products
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Search Products</h1>
            <p className="text-lg text-white/80">
              Find exactly what you're looking for
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-white/60" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="glass w-full pl-12 pr-4 py-4 text-white placeholder-white/60 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search Results */}
        {loading && hasSearched && (
          <div className="text-center mb-8">
            <div className="glass rounded-3xl p-8 inline-block">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white/80">Searching for "{debouncedQuery}"...</p>
            </div>
          </div>
        )}

        {error && hasSearched && (
          <div className="text-center mb-8">
            <div className="glass rounded-3xl p-8 max-w-md mx-auto">
              <p className="text-red-400 mb-2">Search Error</p>
              <p className="text-white/80 text-sm">{error.message}</p>
            </div>
          </div>
        )}

        {!loading && hasSearched && (
          <>
            {/* Search Results Header */}
            <div className="mb-8">
              <div className="glass rounded-2xl p-6 text-center">
                <p className="text-white/90 text-lg">
                  {products.length > 0 
                    ? `Found ${products.length} result${products.length === 1 ? '' : 's'} for "${debouncedQuery}"`
                    : `No results found for "${debouncedQuery}"`
                  }
                </p>
                {products.length === 0 && (
                  <p className="text-white/70 text-sm mt-2">
                    Try adjusting your search terms or browse our categories
                  </p>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(({ node: product }: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* No Results Suggestions */}
            {products.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Link href="/products" className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform group">
                  <div className="text-4xl mb-4">🛍️</div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-purple-200 transition-colors">
                    All Products
                  </h3>
                  <p className="text-white/70 text-sm">Browse our complete catalog</p>
                </Link>

                <Link href="/categories" className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform group">
                  <div className="text-4xl mb-4">📂</div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-purple-200 transition-colors">
                    Categories
                  </h3>
                  <p className="text-white/70 text-sm">Shop by category</p>
                </Link>

                <Link href="/" className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform group">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-purple-200 transition-colors">
                    Featured
                  </h3>
                  <p className="text-white/70 text-sm">Check out featured products</p>
                </Link>
              </div>
            )}
          </>
        )}

        {/* Initial State - No Search Yet */}
        {!hasSearched && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SearchSuggestions onSuggestionClick={setSearchQuery} />
            </div>
            
            <div className="lg:col-span-1">
              <div className="text-center py-16">
                <div className="glass rounded-3xl p-12">
                  <div className="text-6xl mb-6">🔍</div>
                  <h2 className="text-2xl font-bold text-white mb-4">Start Your Search</h2>
                  <p className="text-white/80 mb-6">
                    Enter a product name, category, or keyword to find what you're looking for
                  </p>
                  <div className="text-sm text-white/60">
                    <p>Or try one of the popular searches →</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
