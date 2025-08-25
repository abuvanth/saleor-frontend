'use client'

import { useQuery } from '@apollo/client'
import { ProductCard } from '../../components/ProductCard'
import { FEATURED_PRODUCTS_QUERY } from '../../lib/queries'
import { useChannel } from '../../hooks/useChannel'

export default function ProductsPage() {
  const channel = useChannel()

  const { data, loading, error } = useQuery(FEATURED_PRODUCTS_QUERY, {
    variables: { 
      first: 20,
      channel
    }
  })

  if (loading || !channel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">All Products</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="glass rounded-3xl p-6 animate-pulse">
                <div className="bg-white/20 aspect-square rounded-2xl mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-2/3"></div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-8">
            <h1 className="text-3xl font-bold text-white mb-4">All Products</h1>
            <p className="text-red-400">Error loading products: {error.message}</p>
            <p className="text-sm text-red-300 mt-2">
              Please check your Saleor backend connection and ensure channels are configured properly.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const products = data?.products?.edges || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">All Products</h1>
          <p className="text-lg text-white/80">
            Discover our complete collection of premium products
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(({ node: product }: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-8">
            <div className="glass rounded-3xl p-8">
              <p className="text-white/70">No products available at the moment.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
