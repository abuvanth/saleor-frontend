'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  CheckCircleIcon,
  EnvelopeIcon,
  TruckIcon,
  CalendarIcon,
  DocumentTextIcon,
  ShareIcon,
  PrinterIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '../../store/auth'

export default function OrderConfirmationPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [orderNumber, setOrderNumber] = useState('')
  const [estimatedDelivery, setEstimatedDelivery] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Generate order number and delivery date
    const orderNum = `ORD-${Date.now().toString().slice(-8)}`
    setOrderNumber(orderNum)
    
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 5)
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }))
  }, [isAuthenticated, router])

  const handleContinueShopping = () => {
    router.push('/')
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  const handleShareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Order Confirmation',
          text: `My order ${orderNumber} has been confirmed!`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-ocean flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-ocean section-padding">
      <div className="container-max max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 animate-pulse-glow">
            <CheckCircleIcon className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient-elegant mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-white/80 mb-2">
            Thank you for your order, {user?.firstName}!
          </p>
          <p className="text-white/60">
            We've received your order and are processing it now.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="card-elegant mb-8">
          <div className="border-b border-white/20 pb-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Order Details</h2>
                <div className="flex flex-wrap gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="h-5 w-5 text-purple-400" />
                    <span className="font-medium">Order #</span>
                    <span className="font-mono bg-white/10 px-2 py-1 rounded">{orderNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-purple-400" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handlePrintReceipt}
                  className="btn-glass p-3 rounded-xl"
                  title="Print Receipt"
                >
                  <PrinterIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={handleShareOrder}
                  className="btn-glass p-3 rounded-xl"
                  title="Share Order"
                >
                  <ShareIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-6">Order Status</h3>
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-purple-400 to-gray-400"></div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Order Confirmed</h4>
                    <p className="text-white/60 text-sm">Your order has been received and confirmed</p>
                    <p className="text-green-400 text-sm font-medium">Completed just now</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Processing</h4>
                    <p className="text-white/60 text-sm">We're preparing your items for shipment</p>
                    <p className="text-purple-400 text-sm font-medium">In progress</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <TruckIcon className="h-5 w-5 text-white/60" />
                  </div>
                  <div>
                    <h4 className="text-white/60 font-medium">Shipped</h4>
                    <p className="text-white/40 text-sm">Your order will be shipped soon</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-white/60" />
                  </div>
                  <div>
                    <h4 className="text-white/60 font-medium">Delivered</h4>
                    <p className="text-white/40 text-sm">Estimated delivery: {estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium">Confirmation Email</h4>
                  <p className="text-white/60 text-sm">
                    We've sent a confirmation email to {user?.email} with your order details and tracking information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <TruckIcon className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium">Shipping Updates</h4>
                  <p className="text-white/60 text-sm">
                    You'll receive tracking information once your order ships. Estimated delivery: {estimatedDelivery}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <DocumentTextIcon className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium">Order History</h4>
                  <p className="text-white/60 text-sm">
                    View your order history and track shipments in your account dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/account/orders" className="card-elegant hover:scale-105 transition-all duration-300 group">
            <div className="text-center">
              <DocumentTextIcon className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-white font-bold mb-2">Track Order</h3>
              <p className="text-white/60 text-sm">View order status and tracking information</p>
            </div>
          </Link>
          
          <button
            onClick={handleContinueShopping}
            className="card-elegant hover:scale-105 transition-all duration-300 group text-left"
          >
            <div className="text-center">
              <ShoppingBagIcon className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-white font-bold mb-2">Continue Shopping</h3>
              <p className="text-white/60 text-sm">Explore more amazing products</p>
            </div>
          </button>
          
          <Link href="/support" className="card-elegant hover:scale-105 transition-all duration-300 group">
            <div className="text-center">
              <EnvelopeIcon className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-white font-bold mb-2">Get Help</h3>
              <p className="text-white/60 text-sm">Contact support for any questions</p>
            </div>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="card-elegant">
          <h3 className="text-lg font-bold text-white mb-6 text-center">Why Shop With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">Quality Guaranteed</h4>
              <p className="text-white/60 text-sm">Premium quality products with satisfaction guarantee</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">Fast Shipping</h4>
              <p className="text-white/60 text-sm">Free shipping on orders over $100 with fast delivery</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">24/7 Support</h4>
              <p className="text-white/60 text-sm">Round-the-clock customer support for all your needs</p>
            </div>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="text-center mt-12">
          <p className="text-white/60 mb-4">Love your purchase? Share it with friends!</p>
          <div className="flex justify-center gap-4">
            <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
              <ShareIcon className="h-5 w-5 text-white" />
            </button>
            <button className="w-12 h-12 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors duration-300">
              <ShareIcon className="h-5 w-5 text-white" />
            </button>
            <button className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300">
              <ShareIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
