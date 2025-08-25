'use client'

import { useQuery } from '@apollo/client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { CATEGORIES_QUERY } from '../../lib/queries'

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, loading, error } = useQuery(CATEGORIES_QUERY, {
    variables: { first: 50 }
  })

  // Update document title
  useEffect(() => {
    document.title = 'Categories - Saleor Store'
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 mb-8 animate-pulse">
            <div className="bg-white/20 h-8 rounded w-1/3 mb-4"></div>
            <div className="bg-white/20 h-4 rounded w-2/3"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="glass rounded-3xl p-6 animate-pulse">
                <div className="bg-white/20 aspect-square rounded-2xl mb-4"></div>
                <div className="bg-white/20 h-6 rounded mb-2"></div>
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
            <h1 className="text-2xl font-bold text-white mb-4">Error Loading Categories</h1>
            <p className="text-white/80 mb-6">Unable to load categories. Please try again later.</p>
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const categories = data?.categories?.edges || []
  
  // Filter categories based on search term
  const filteredCategories = categories.filter((category: any) =>
    category.node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.node.description && category.node.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

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
            <li className="text-white font-medium">
              Categories
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 glass-dark text-white/90 rounded-xl hover:text-white hover:scale-105 transition-all duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="glass rounded-3xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Shop by Category
            </h1>
            <p className="text-xl text-white/80 mb-6 max-w-3xl mx-auto">
              Discover our curated collection of products organized by category
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full glass-dark text-white placeholder-white/50 pl-10 pr-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6 text-white/60">
            <span>{filteredCategories.length} categories found</span>
            {searchTerm && <span>• Filtered by "{searchTerm}"</span>}
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map(({ node: category }: any) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className="glass rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/30 backdrop-blur-xl">
                  {/* Category Image */}
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-100/30 to-pink-100/30 relative">
                    {category.backgroundImage?.url ? (
                      <Image
                        src={category.backgroundImage.url}
                        alt={category.backgroundImage.alt || category.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200/50 to-pink-200/50">
                        <span className="text-6xl opacity-30">📦</span>
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Product count badge */}
                    <div className="absolute top-4 right-4 glass-dark px-3 py-1 rounded-full text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.products?.totalCount || 0} products
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-100 transition-colors">
                      {category.name}
                    </h3>
                    
                    {category.description && (
                      <p className="text-sm text-white/80 mb-4 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">
                        {category.products?.totalCount || 0} products
                      </span>
                      
                      <div className="glass-dark bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 border border-white/20">
                        Browse →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass rounded-3xl p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">No Categories Found</h3>
            <p className="text-white/80 mb-6">
              {searchTerm 
                ? `No categories match "${searchTerm}". Try a different search term.`
                : "No categories are available at the moment."
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
