'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '../store/cart'
import { Cart } from './Cart'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openCart, getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header className="glass-dark backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                HyraBuy
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/90 hover:text-white font-medium transition-all duration-200 hover:scale-105 relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="glass w-full pl-10 pr-4 py-2.5 text-white placeholder-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-xl transition-all duration-200"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Search icon for mobile */}
              <button className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>

              {/* User account */}
              <Link href="/account" className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <UserIcon className="h-6 w-6" />
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative group"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden glass-dark rounded-2xl mt-4 mb-4 p-4 animate-slide-up border border-white/20">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {/* Mobile search */}
              <div className="pt-4 mt-4 border-t border-white/20">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="glass w-full pl-10 pr-4 py-2.5 text-white placeholder-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-xl"
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <Cart />
    </>
  )
}
