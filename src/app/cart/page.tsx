'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { 
  TrashIcon, 
  PlusIcon, 
  MinusIcon, 
  ShoppingBagIcon,
  ArrowLeftIcon,
  HeartIcon,
  GiftIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useCartStore } from '../../store/cart'
import { useAuthStore } from '../../store/auth'
import toast from 'react-hot-toast'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set())

  const subtotal = getTotalPrice()
  const shipping = subtotal > 100 ? 0 : 10
  const discount = appliedPromo ? subtotal * 0.1 : 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + tax + shipping

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API call
    updateQuantity(id, newQuantity)
    setIsLoading(false)
  }

  const handleRemoveItem = async (id: string, name: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    removeItem(id)
    toast.success(`${name} removed from cart`)
    setIsLoading(false)
  }

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo(promoCode)
      toast.success('Promo code applied! 10% discount')
    } else {
      toast.error('Invalid promo code')
    }
    setPromoCode('')
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    toast.success('Promo code removed')
  }

  const toggleWishlist = (id: string, name: string) => {
    const newWishlist = new Set(wishlistItems)
    if (newWishlist.has(id)) {
      newWishlist.delete(id)
      toast.success(`${name} removed from wishlist`)
    } else {
      newWishlist.add(id)
      toast.success(`${name} added to wishlist`)
    }
    setWishlistItems(newWishlist)
  }

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to proceed to checkout')
      router.push('/auth/login?redirect=/checkout')
      return
    }
    router.push('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen gradient-ocean section-padding">
        <div className="container-max">
          <div className="text-center">
            <div className="card-elegant max-w-2xl mx-auto">
              <div className="mb-8">
                <ShoppingBagIcon className="h-24 w-24 text-white/40 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gradient-elegant mb-4">Your Cart is Empty</h1>
                <p className="text-white/80 text-lg">
                  Looks like you haven't added anything to your cart yet. 
                  Start shopping to find amazing products!
                </p>
              </div>
              
              <div className="space-y-4">
                <Link 
                  href="/products"
                  className="btn-elegant w-full py-4 px-8 text-lg font-semibold flex items-center justify-center gap-3"
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                  Start Shopping
                </Link>
                
                <Link 
                  href="/"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  ← Continue browsing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-ocean section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gradient-elegant mb-2">Shopping Cart</h1>
            <p className="text-white/80 text-lg">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          
          <Link 
            href="/products"
            className="btn-glass flex items-center gap-2 px-6 py-3"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Free Shipping Banner */}
            {subtotal < 100 && (
              <div className="glass-dark rounded-2xl p-4 border-2 border-orange-400/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TruckIcon className="h-6 w-6 text-orange-400" />
                    <span className="text-white font-medium">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </span>
                  </div>
                  <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="card-elegant backdrop-blur-xl border-2 border-white/30">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative w-full sm:w-32 h-48 sm:h-32 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-2xl overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBagIcon className="h-12 w-12 text-white/40" />
                        </div>
                      )}
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(item.id, item.name)}
                        className="absolute top-3 right-3 glass-dark p-2 rounded-full hover:bg-white/20 transition-all duration-300"
                      >
                        {wishlistItems.has(item.id) ? (
                          <HeartSolidIcon className="h-5 w-5 text-red-400" />
                        ) : (
                          <HeartIcon className="h-5 w-5 text-white/70 hover:text-red-400" />
                        )}
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                        {item.variant && (
                          <p className="text-white/70 text-sm">Variant: {item.variant.name}</p>
                        )}
                        <p className="text-2xl font-bold text-gradient">${item.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-white/80 font-medium">Quantity:</span>
                          <div className="flex items-center glass-dark rounded-xl">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={isLoading || item.quantity <= 1}
                              className="p-3 hover:bg-white/10 rounded-l-xl transition-colors disabled:opacity-50"
                            >
                              <MinusIcon className="h-4 w-4 text-white" />
                            </button>
                            <span className="px-4 py-3 text-white font-semibold min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={isLoading}
                              className="p-3 hover:bg-white/10 rounded-r-xl transition-colors disabled:opacity-50"
                            >
                              <PlusIcon className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          disabled={isLoading}
                          className="glass-dark p-3 rounded-xl hover:bg-red-500/20 transition-all duration-300 disabled:opacity-50"
                        >
                          <TrashIcon className="h-5 w-5 text-red-400" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="flex justify-between items-center pt-2 border-t border-white/20">
                        <span className="text-white/70">Subtotal:</span>
                        <span className="text-xl font-bold text-gradient">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart()
                    toast.success('Cart cleared')
                  }
                }}
                className="btn-glass flex items-center justify-center gap-2 py-3 px-6"
              >
                <TrashIcon className="h-5 w-5" />
                Clear Cart
              </button>
              
              <Link 
                href="/products"
                className="btn-secondary flex items-center justify-center gap-2 py-3 px-6"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <div className="card-elegant backdrop-blur-xl border-2 border-white/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <GiftIcon className="h-6 w-6 text-purple-400" />
                Promo Code
              </h3>
              
              {appliedPromo ? (
                <div className="flex items-center justify-between glass-dark rounded-xl p-4">
                  <div>
                    <span className="text-green-400 font-medium">{appliedPromo}</span>
                    <p className="text-white/70 text-sm">10% discount applied</p>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="input-field-dark flex-1"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={!promoCode.trim()}
                    className="btn-elegant px-6 py-3 disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="card-elegant backdrop-blur-xl border-2 border-white/30">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-white/80">
                  <span className="flex items-center gap-2">
                    <TruckIcon className="h-4 w-4" />
                    Shipping
                  </span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between text-white/80">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gradient">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleProceedToCheckout}
                className="w-full mt-6 btn-elegant py-4 px-6 text-lg font-semibold flex items-center justify-center gap-3"
              >
                <ShieldCheckIcon className="h-6 w-6" />
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-white/60 text-sm">
                  Secure checkout powered by SSL encryption
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="card-elegant backdrop-blur-xl border-2 border-white/30 text-center">
              <h4 className="text-lg font-bold text-white mb-4">Why Shop With Us?</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="h-5 w-5 text-green-400" />
                  <span className="text-white/80">Secure Payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <TruckIcon className="h-5 w-5 text-blue-400" />
                  <span className="text-white/80">Free Shipping Over $100</span>
                </div>
                <div className="flex items-center gap-3">
                  <HeartIcon className="h-5 w-5 text-red-400" />
                  <span className="text-white/80">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
