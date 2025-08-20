'use client'

import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: '/images/electronics.jpg',
    href: '/categories/electronics'
  },
  {
    id: 2,
    name: 'Fashion',
    image: '/images/fashion.jpg',
    href: '/categories/fashion'
  },
  {
    id: 3,
    name: 'Home & Garden',
    image: '/images/home-garden.jpg',
    href: '/categories/home-garden'
  },
  {
    id: 4,
    name: 'Sports',
    image: '/images/sports.jpg',
    href: '/categories/sports'
  },
  {
    id: 5,
    name: 'Books',
    image: '/images/books.jpg',
    href: '/categories/books'
  },
  {
    id: 6,
    name: 'Beauty',
    image: '/images/beauty.jpg',
    href: '/categories/beauty'
  }
]

export function CategoryGrid() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="glass rounded-3xl p-8 inline-block mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-white/90 max-w-2xl">
              Explore our wide range of products across different categories
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden"
            >
              <div className="glass rounded-2xl aspect-square hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:bg-white/30 backdrop-blur-xl border border-white/20 relative overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute inset-0 opacity-60 ${
                  index % 6 === 0 ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30' :
                  index % 6 === 1 ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30' :
                  index % 6 === 2 ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30' :
                  index % 6 === 3 ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30' :
                  index % 6 === 4 ? 'bg-gradient-to-br from-red-500/30 to-pink-500/30' :
                  'bg-gradient-to-br from-indigo-500/30 to-purple-500/30'
                }`}></div>
                
                {/* Content */}
                <div className="relative h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    {/* Icon placeholder */}
                    <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-xl font-bold">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm group-hover:text-purple-200 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
