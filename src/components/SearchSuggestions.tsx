'use client'

import Link from 'next/link'

interface SearchSuggestionsProps {
  onSuggestionClick?: (query: string) => void
}

export function SearchSuggestions({ onSuggestionClick }: SearchSuggestionsProps) {
  const popularSearches = [
    'Apple Juice',
    'Electronics',
    'Clothing',
    'Books',
    'Sports',
    'Beauty',
    'Home & Garden',
    'Accessories'
  ]

  const categories = [
    { name: 'Juices', query: 'juice' },
    { name: 'Electronics', query: 'electronics' },
    { name: 'Fashion', query: 'clothing' },
    { name: 'Books', query: 'books' },
    { name: 'Sports', query: 'sports' },
    { name: 'Beauty', query: 'beauty' }
  ]

  return (
    <div className="space-y-8">
      {/* Popular Searches */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Popular Searches</h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => onSuggestionClick?.(search)}
              className="px-4 py-2 glass-dark text-white/90 rounded-xl hover:text-white hover:scale-105 transition-all duration-300 text-sm"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Category Access */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onSuggestionClick?.(category.query)}
              className="p-4 glass-dark rounded-xl hover:scale-105 transition-all duration-300 text-center group"
            >
              <div className="text-2xl mb-2">🛍️</div>
              <div className="text-white/90 group-hover:text-white transition-colors text-sm font-medium">
                {category.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search Tips */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Search Tips</h3>
        <div className="space-y-2 text-white/80 text-sm">
          <p>• Use specific product names for better results</p>
          <p>• Try searching by brand, category, or color</p>
          <p>• Use simple keywords rather than full sentences</p>
          <p>• Check spelling if you don't find what you're looking for</p>
        </div>
      </div>
    </div>
  )
}
