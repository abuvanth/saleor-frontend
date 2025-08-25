'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '../store/cart'
import { HeartIcon, ShoppingCartIcon, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  thumbnail?: {
    url: string
    alt?: string
  }
  pricing?: {
    priceRange?: {
      start?: {
        gross?: {
          amount: number
          currency: string
        }
      }
    }
  }
  category?: {
    id: string
    name: string
  }
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const price = product.pricing?.priceRange?.start?.gross?.amount || 0
  const currency = product.pricing?.priceRange?.start?.gross?.currency || 'USD'

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isLoading) return
    
    setIsLoading(true)
    
    // Simulate loading for better UX
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: price,
        image: product.thumbnail?.url
      })
      
      toast.success(
        <div className="flex items-center gap-2">
          <ShoppingCartIcon className="h-5 w-5 text-green-500" />
          <span>{product.name} added to cart!</span>
        </div>
      )
      setIsLoading(false)
    }, 300)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsWishlisted(!isWishlisted)
    toast.success(
      <div className="flex items-center gap-2">
        {!isWishlisted ? (
          <HeartSolidIcon className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5 text-gray-500" />
        )}
        <span>{!isWishlisted ? 'Added to wishlist' : 'Removed from wishlist'}</span>
      </div>
    )
  }

  const parseDescription = (description: string) => {
    try {
      const parsed = JSON.parse(description)
      
      if (parsed.blocks && Array.isArray(parsed.blocks)) {
        const textContent = parsed.blocks
          .filter((block: any) => block.type === 'paragraph' && block.data?.text)
          .map((block: any) => {
            const text = block.data.text
              .replace(/<[^>]*>/g, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/\\u2019/g, "'")
              .trim()
            return text
          })
          .join(' ')
        
        return textContent.length > 80 ? textContent.substring(0, 80) + '...' : textContent
      }
      
      return String(parsed).substring(0, 80) + '...'
    } catch (error) {
      const text = description.replace(/[\r\n]+/g, ' ').trim()
      return text.length > 80 ? text.substring(0, 80) + '...' : text
    }
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="card-product relative overflow-hidden backdrop-blur-xl border-2 border-white/20 hover:border-white/40">
        {/* Image container with enhanced overlay */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-2xl mb-4">
          {product.thumbnail?.url ? (
            <Image
              src={product.thumbnail.url}
              alt={product.thumbnail.alt || product.name}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200/30 to-pink-200/30">
              <EyeIcon className="h-16 w-16 text-white/40" />
            </div>
          )}
          
          {/* Enhanced overlay with action buttons */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={handleWishlistToggle}
                className="glass-dark p-3 rounded-full hover:bg-white/20 transition-all duration-300 group/btn"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="h-5 w-5 text-red-400" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-white group-hover/btn:text-red-400 transition-colors" />
                )}
              </button>
              
              <div className="glass-dark p-3 rounded-full hover:bg-white/20 transition-all duration-300">
                <EyeIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            
            {/* Quick add to cart button */}
            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full btn-elegant flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>
                    <ShoppingCartIcon className="h-4 w-4" />
                    Quick Add
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sale badge */}
          {price > 0 && (
            <div className="absolute top-4 left-4">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                NEW
              </div>
            </div>
          )}
        </div>
        
        {/* Product info */}
        <div className="space-y-3">
          {/* Category */}
          {product.category && (
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/20 rounded-full border border-purple-400/30">
                {product.category.name}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                ))}
                <span className="text-white/60 text-xs ml-1">(4.0)</span>
              </div>
            </div>
          )}
          
          {/* Product name */}
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-gradient transition-colors duration-300">
            {product.name}
          </h3>
          
          {/* Description */}
          {product.description && (
            <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">
              {parseDescription(product.description)}
            </p>
          )}
          
          {/* Price and actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gradient">
                {price > 0 ? `$${price.toFixed(2)}` : 'Contact for price'}
              </div>
              <div className="text-xs text-white/50 line-through">
                ${(price * 1.2).toFixed(2)}
              </div>
            </div>
            
            <div className="text-xs text-white/60">
              Free shipping
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
             style={{
               background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%)',
               boxShadow: '0 0 40px rgba(102, 126, 234, 0.3)'
             }}>
        </div>
      </div>
    </Link>
  )
}
