'use client'

import { useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowLeftIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline'
import { PRODUCTS_BY_CATEGORY_QUERY } from '../../../lib/queries'
import { useChannel } from '../../../hooks/useChannel'
import { ProductCard } from '../../../components/ProductCard'

type ViewMode = 'grid' | 'list'
type SortOption = 'name' | 'price-asc' | 'price-desc' | 'newest'

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const channel = useChannel()
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [showFilters, setShowFilters] = useState(false)

  const { data, loading, error, fetchMore } = useQuery(PRODUCTS_BY_CATEGORY_QUERY, {
    variables: { 
      categorySlug: slug, 
      first: 12,
      channel 
    },
    skip: !channel || !slug
  })

  // Update document title when category data loads
  useEffect(() => {
    if (data?.category?.name) {
      document.title = `${data.category.name} - Saleor Store`
    }
  }, [data?.category?.name])

  if (loading || !channel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading Header */}
          <div className="glass rounded-3xl p-8 mb-8 animate-pulse">
            <div className="bg-white/20 h-8 rounded w-1/3 mb-4"></div>
            <div className="bg-white/20 h-4 rounded w-2/3"></div>
          </div>

          {/* Loading Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="glass rounded-3xl p-6 animate-pulse">
                <div className="bg-white/20 aspect-square rounded-2xl mb-4"></div>
                <div className="bg-white/20 h-4 rounded mb-2"></div>
                <div className="bg-white/20 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
            <p className="text-white/80 mb-6">The category you're looking for doesn't exist or may have been removed.</p>
            <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const category = data?.category
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
            <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const products = category.products?.edges || []
  const hasNextPage = category.products?.pageInfo?.hasNextPage || false

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a: any, b: any) => {
    switch (sortBy) {
      case 'name':
        return a.node.name.localeCompare(b.node.name)
      case 'price-asc':
        const priceA = a.node.pricing?.priceRange?.start?.gross?.amount || 0
        const priceB = b.node.pricing?.priceRange?.start?.gross?.amount || 0
        return priceA - priceB
      case 'price-desc':
        const priceDescA = a.node.pricing?.priceRange?.start?.gross?.amount || 0
        const priceDescB = b.node.pricing?.priceRange?.start?.gross?.amount || 0
        return priceDescB - priceDescA
      case 'newest':
        return b.node.id.localeCompare(a.node.id)
      default:
        return 0
    }
  })

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchMore({
        variables: {
          after: category.products.pageInfo.endCursor
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev
          
          return {
            ...prev,
            category: {
              ...prev.category,
              products: {
                ...fetchMoreResult.category.products,
                edges: [
                  ...prev.category.products.edges,
                  ...fetchMoreResult.category.products.edges
                ]
              }
            }
          }
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-white/70 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <span className="text-white/50">/</span>
            <li>
              <Link href="/products" className="text-white/70 hover:text-white transition-colors">
                Products
              </Link>
            </li>
            <span className="text-white/50">/</span>
            <li className="text-white font-medium">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/products" 
            className="inline-flex items-center px-4 py-2 glass-dark text-white/90 rounded-xl hover:text-white hover:scale-105 transition-all duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>

        {/* Category Header */}
        <div className="glass rounded-3xl p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xl text-white/80 mb-6 max-w-3xl mx-auto">
                {category.description}
              </p>
            )}
            <div className="flex items-center justify-center space-x-6 text-white/60">
              <span>{products.length} products</span>
              {hasNextPage && <span>• More available</span>}
            </div>
          </div>
        </div>

        {/* Filters and View Options */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <label className="text-white font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="glass-dark text-white bg-transparent border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="name">Name A-Z</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-white/70 text-sm">View:</span>
              <div className="flex items-center glass-dark rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <ListBulletIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {sortedProducts.length > 0 ? (
          <>
            <div className={`grid gap-6 mb-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map(({ node: product }: any) => (
                <div key={product.id} className={viewMode === 'list' ? 'max-w-none' : ''}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Load More Products
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="glass rounded-3xl p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">No Products Found</h3>
            <p className="text-white/80 mb-6">
              This category doesn't have any products yet.
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
