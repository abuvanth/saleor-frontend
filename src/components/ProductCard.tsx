'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '../store/cart'
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
  
  const price = product.pricing?.priceRange?.start?.gross?.amount || 0
  const currency = product.pricing?.priceRange?.start?.gross?.currency || 'USD'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the button
    e.stopPropagation()
    
    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: product.thumbnail?.url
    })
    
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="glass rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/30 backdrop-blur-xl">
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-100/30 to-pink-100/30">
          {product.thumbnail?.url ? (
            <Image
              src={product.thumbnail.url}
              alt={product.thumbnail.alt || product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200/50 to-pink-200/50">
              <span className="text-white/70 text-sm font-medium">No image</span>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-6 relative">
          <div className="mb-3">
            {product.category && (
              <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-purple-500/60 to-pink-500/60 rounded-full backdrop-blur-sm border border-white/20">
                {product.category.name}
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-100 transition-colors">
            {product.name}
          </h3>
          
          {product.description && (
            <div className="text-sm text-white/80 mb-4 line-clamp-2">
              {(() => {
                try {
                  // Try to parse as JSON first
                  const parsed = JSON.parse(product.description)
                  
                  // Handle Editor.js format
                  if (parsed.blocks && Array.isArray(parsed.blocks)) {
                    const textContent = parsed.blocks
                      .filter((block: any) => block.type === 'paragraph' && block.data?.text)
                      .map((block: any) => {
                        // Strip HTML tags and decode HTML entities
                        const text = block.data.text
                          .replace(/<[^>]*>/g, '') // Remove HTML tags
                          .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
                          .replace(/&amp;/g, '&') // Replace &amp; with &
                          .replace(/&lt;/g, '<') // Replace &lt; with <
                          .replace(/&gt;/g, '>') // Replace &gt; with >
                          .replace(/&quot;/g, '"') // Replace &quot; with "
                          .replace(/&#39;/g, "'") // Replace &#39; with '
                          .replace(/\\u2019/g, "'") // Replace unicode apostrophe
                          .trim()
                        return text
                      })
                      .join(' ')
                    
                    return textContent.length > 100 ? textContent.substring(0, 100) + '...' : textContent
                  }
                  
                  // Handle other JSON structures
                  if (Array.isArray(parsed)) {
                    return parsed.slice(0, 2).map((item, index) => (
                      <span key={index}>
                        {typeof item === 'string' ? item : JSON.stringify(item)}
                        {index < 1 && index < parsed.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  } else if (typeof parsed === 'object' && parsed !== null) {
                    // For objects, show first key-value pair
                    const entries = Object.entries(parsed).slice(0, 1)
                    return entries.map(([key, value]) => (
                      <span key={key}>
                        {key}: {Array.isArray(value) ? value.join(', ') : String(value)}
                      </span>
                    ))
                  } else {
                    return String(parsed).substring(0, 100) + '...'
                  }
                } catch (error) {
                  // If not JSON, handle as regular text
                  const text = product.description.replace(/[\r\n]+/g, ' ').trim()
                  return text.length > 100 ? text.substring(0, 100) + '...' : text
                }
              })()}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              {price > 0 ? `$${price.toFixed(2)}` : 'Price not available'}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="glass-dark bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 border border-white/20"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
