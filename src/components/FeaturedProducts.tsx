'use client'

import { useQuery } from '@apollo/client'
import { ProductCard } from './ProductCard'
import { FEATURED_PRODUCTS_QUERY } from '../lib/queries'
import { useChannel } from '../hooks/useChannel'

export function FeaturedProducts() {
  const channel = useChannel()

  const { data, loading, error } = useQuery(FEATURED_PRODUCTS_QUERY, {
    variables: { first: 8, channel }
  })

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="glass rounded-3xl p-8 inline-block">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Featured Products
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass rounded-3xl p-6 animate-pulse">
                <div className="bg-gradient-to-br from-purple-200/30 to-pink-200/30 aspect-square rounded-2xl mb-4"></div>
                <div className="h-4 bg-white/30 rounded-xl mb-2"></div>
                <div className="h-4 bg-white/20 rounded-xl w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-8 inline-block">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Products</h2>
            <p className="text-red-300 bg-red-500/20 p-4 rounded-xl backdrop-blur-sm">
              Error loading products: {error.message}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const products = data?.products?.edges || []

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="glass rounded-3xl p-8 inline-block float">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-white/90 max-w-2xl">
              Discover our handpicked selection of premium products
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(({ node: product }: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="glass rounded-3xl p-8 max-w-md mx-auto">
              <div className="text-white/70 text-6xl mb-4">🛍️</div>
              <p className="text-white/80 text-lg">No products available at the moment.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
