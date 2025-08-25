'use client'

import { useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowLeftIcon, ShoppingCartIcon, HeartIcon, ShareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { PRODUCT_DETAILS_QUERY } from '../../../lib/queries'
import { useChannel } from '../../../hooks/useChannel'
import { useCartStore } from '../../../store/cart'
import toast from 'react-hot-toast'

export default function ProductDetailsPage() {
  const params = useParams()
  const slug = params.slug as string
  const channel = useChannel()
  const { addItem } = useCartStore()
  
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isImageZoomed, setIsImageZoomed] = useState(false)

  const { data, loading, error } = useQuery(PRODUCT_DETAILS_QUERY, {
    variables: { slug, channel },
    skip: !channel || !slug
  })

  // Update document title when product data loads
  useEffect(() => {
    if (data?.product?.name) {
      document.title = `${data.product.name} - Saleor Store`
    }
  }, [data?.product?.name])

  if (loading || !channel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="bg-white/20 aspect-square rounded-2xl"></div>
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white/20 w-20 h-20 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white/20 h-8 rounded w-3/4"></div>
                <div className="bg-white/20 h-6 rounded w-1/2"></div>
                <div className="bg-white/20 h-24 rounded"></div>
                <div className="bg-white/20 h-12 rounded w-1/3"></div>
              </div>
            </div>
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
            <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-white/80 mb-6">The product you're looking for doesn't exist or may have been removed.</p>
            <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const product = data?.product
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
            <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const price = product.pricing?.priceRange?.start?.gross?.amount || 0
  const currency = product.pricing?.priceRange?.start?.gross?.currency || 'USD'
  const images = product.media || []
  const variants = product.variants || []

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: price,
      image: images[0]?.url
    }
    
    // Add the item to cart (it will default to quantity 1)
    addItem(item)
    
    // If quantity is more than 1, add the remaining quantity
    if (quantity > 1) {
      for (let i = 1; i < quantity; i++) {
        addItem(item)
      }
    }
    
    toast.success(`${product.name} added to cart!`)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description || '',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Product link copied to clipboard!')
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
              {product.name}
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

        <div className="glass rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div 
                className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100/20 to-pink-100/20 backdrop-blur-sm cursor-zoom-in relative group"
                onClick={() => setIsImageZoomed(true)}
              >
                {images.length > 0 ? (
                  <>
                    <Image
                      src={images[selectedImageIndex]?.url}
                      alt={images[selectedImageIndex]?.alt || product.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <div className="glass-dark px-3 py-1 rounded-lg text-white text-sm font-medium">
                        Click to zoom
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/70 text-lg font-medium">No image available</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === selectedImageIndex 
                          ? 'border-purple-400 ring-2 ring-purple-400/50' 
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || `${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              {product.category && (
                <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-purple-500/60 to-pink-500/60 rounded-full backdrop-blur-sm border border-white/20">
                  {product.category.name}
                </span>
              )}

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  {price > 0 ? `$${price.toFixed(2)}` : 'Price not available'}
                </div>
                {selectedVariant && variants.find((v: any) => v.id === selectedVariant)?.pricing?.price?.gross && (
                  <div className="text-lg text-white/70">
                    Variant: ${variants.find((v: any) => v.id === selectedVariant)?.pricing?.price?.gross?.amount?.toFixed(2)}
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="prose prose-invert max-w-none">
                  <div className="text-white/90 text-lg leading-relaxed">
                    {(() => {
                      try {
                        // Try to parse as JSON first
                        const parsed = JSON.parse(product.description)
                        
                        // Handle Editor.js format
                        if (parsed.blocks && Array.isArray(parsed.blocks)) {
                          return (
                            <div className="space-y-4">
                              {parsed.blocks.map((block: any, index: number) => {
                                if (block.type === 'paragraph' && block.data?.text) {
                                  // Clean HTML and render as paragraph
                                  const cleanText = block.data.text
                                    .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>') // Convert <b> to <strong>
                                    .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>') // Convert <i> to <em>
                                    .replace(/\\u2019/g, "'") // Replace unicode apostrophe
                                  
                                  return (
                                    <p 
                                      key={index} 
                                      className="text-white/90 leading-relaxed"
                                      dangerouslySetInnerHTML={{ __html: cleanText }}
                                    />
                                  )
                                } else if (block.type === 'header' && block.data?.text) {
                                  const level = block.data.level || 2
                                  const HeaderTag = `h${Math.min(level + 2, 6)}` as keyof JSX.IntrinsicElements
                                  return (
                                    <HeaderTag key={index} className="font-bold text-white mt-6 mb-3">
                                      {block.data.text}
                                    </HeaderTag>
                                  )
                                } else if (block.type === 'list' && block.data?.items) {
                                  const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul'
                                  return (
                                    <ListTag key={index} className="list-disc list-inside space-y-2 ml-4">
                                      {block.data.items.map((item: string, itemIndex: number) => (
                                        <li key={itemIndex} className="text-white/90">
                                          {item}
                                        </li>
                                      ))}
                                    </ListTag>
                                  )
                                }
                                return null
                              })}
                            </div>
                          )
                        }
                        
                        // Handle different JSON structures
                        if (Array.isArray(parsed)) {
                          return (
                            <ul className="list-disc list-inside space-y-2">
                              {parsed.map((item, index) => (
                                <li key={index} className="text-white/90">
                                  {typeof item === 'string' ? item : JSON.stringify(item)}
                                </li>
                              ))}
                            </ul>
                          )
                        } else if (typeof parsed === 'object' && parsed !== null) {
                          return (
                            <div className="space-y-3">
                              {Object.entries(parsed).map(([key, value]) => (
                                <div key={key} className="border-l-2 border-purple-400/50 pl-4">
                                  <h4 className="font-semibold text-white capitalize mb-1">
                                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                  </h4>
                                  <div className="text-white/80">
                                    {Array.isArray(value) ? (
                                      <ul className="list-disc list-inside ml-2 space-y-1">
                                        {value.map((item, index) => (
                                          <li key={index}>{String(item)}</li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <span>{String(value)}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        } else {
                          return <p>{String(parsed)}</p>
                        }
                      } catch (error) {
                        // If not JSON, check if it contains line breaks or special formatting
                        const lines = product.description.split('\n').filter((line: string) => line.trim())
                        
                        if (lines.length > 1) {
                          return (
                            <div className="space-y-2">
                              {lines.map((line: string, index: number) => {
                                const trimmedLine = line.trim()
                                
                                // Check if it looks like a bullet point
                                if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
                                  return (
                                    <div key={index} className="flex items-start space-x-2">
                                      <span className="text-purple-400 mt-1">•</span>
                                      <span>{trimmedLine.replace(/^[•\-*]\s*/, '')}</span>
                                    </div>
                                  )
                                }
                                
                                // Check if it looks like a heading (all caps or ends with :)
                                if (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length < 50 || trimmedLine.endsWith(':')) {
                                  return (
                                    <h4 key={index} className="font-semibold text-white mt-4 mb-2">
                                      {trimmedLine}
                                    </h4>
                                  )
                                }
                                
                                return (
                                  <p key={index} className="text-white/90">
                                    {trimmedLine}
                                  </p>
                                )
                              })}
                            </div>
                          )
                        } else {
                          // Single line or paragraph
                          return <p>{product.description}</p>
                        }
                      }
                    })()}
                  </div>
                </div>
              )}

              {/* Variants */}
              {variants.length > 1 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Variants</h3>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant: any) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 relative ${
                          selectedVariant === variant.id
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'glass-dark text-white/90 hover:text-white hover:scale-105'
                        }`}
                      >
                        {variant.name}
                        {variant.quantityAvailable !== undefined && (
                          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {variant.quantityAvailable}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  {selectedVariant && (
                    <div className="text-sm text-white/70">
                      {(() => {
                        const variant = variants.find((v: any) => v.id === selectedVariant)
                        if (variant?.quantityAvailable === 0) {
                          return <span className="text-red-400">Out of stock</span>
                        } else if (variant?.quantityAvailable && variant.quantityAvailable < 5) {
                          return <span className="text-orange-400">Only {variant.quantityAvailable} left in stock</span>
                        } else if (variant?.quantityAvailable) {
                          return <span className="text-green-400">In stock ({variant.quantityAvailable} available)</span>
                        }
                        return <span className="text-green-400">In stock</span>
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* Stock status for single variant */}
              {variants.length === 1 && (
                <div className="text-sm">
                  {(() => {
                    const variant = variants[0]
                    if (variant?.quantityAvailable === 0) {
                      return <span className="text-red-400 font-medium">Out of stock</span>
                    } else if (variant?.quantityAvailable && variant.quantityAvailable < 5) {
                      return <span className="text-orange-400 font-medium">Only {variant.quantityAvailable} left in stock</span>
                    } else if (variant?.quantityAvailable) {
                      return <span className="text-green-400 font-medium">In stock ({variant.quantityAvailable} available)</span>
                    }
                    return <span className="text-green-400 font-medium">In stock</span>
                  })()}
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 glass-dark rounded-lg flex items-center justify-center text-white font-bold hover:scale-105 transition-transform"
                  >
                    -
                  </button>
                  <span className="w-16 text-center text-xl font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 glass-dark rounded-lg flex items-center justify-center text-white font-bold hover:scale-105 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <ShoppingCartIcon className="w-6 h-6 mr-2" />
                  Add to Cart
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="glass-dark p-4 rounded-xl text-white hover:scale-105 transition-all duration-300"
                  >
                    {isFavorite ? (
                      <HeartSolidIcon className="w-6 h-6 text-red-400" />
                    ) : (
                      <HeartIcon className="w-6 h-6" />
                    )}
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="glass-dark p-4 rounded-xl text-white hover:scale-105 transition-all duration-300"
                  >
                    <ShareIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Zoom Modal */}
        {isImageZoomed && images.length > 0 && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsImageZoomed(false)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setIsImageZoomed(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <Image
                src={images[selectedImageIndex]?.url}
                alt={images[selectedImageIndex]?.alt || product.name}
                width={800}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
