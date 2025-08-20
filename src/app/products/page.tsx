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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-red-600">Error loading products: {error.message}</p>
          <p className="text-sm text-red-500 mt-2">
            Please check your Saleor backend connection and ensure channels are configured properly.
          </p>
        </div>
      </div>
    )
  }

  const products = data?.products?.edges || []

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-lg text-gray-600">
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
            <p className="text-gray-500">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
