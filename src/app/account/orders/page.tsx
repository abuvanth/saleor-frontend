'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  EyeIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '../../../store/auth'

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: number
  total: number
  trackingNumber?: string
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-12345678',
    date: '2024-01-15',
    status: 'delivered',
    items: 3,
    total: 159.99,
    trackingNumber: 'TRK123456789'
  },
  {
    id: '2',
    orderNumber: 'ORD-12345677',
    date: '2024-01-10',
    status: 'shipped',
    items: 1,
    total: 89.99,
    trackingNumber: 'TRK123456788'
  },
  {
    id: '3',
    orderNumber: 'ORD-12345676',
    date: '2024-01-05',
    status: 'processing',
    items: 2,
    total: 199.99
  }
]

export default function OrdersPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/account/orders')
      return
    }

    // Simulate loading orders
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [isAuthenticated, router])

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-yellow-400" />
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-blue-400" />
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-400" />
      case 'cancelled':
        return <DocumentTextIcon className="h-5 w-5 text-red-400" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'text-yellow-400'
      case 'shipped':
        return 'text-blue-400'
      case 'delivered':
        return 'text-green-400'
      case 'cancelled':
        return 'text-red-400'
      default:
        return 'text-gray-400'
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
      <div className="container-max max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="btn-glass p-3 rounded-xl">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gradient-elegant">Order History</h1>
            <p className="text-white/80 mt-2">Track and manage your orders</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="card-elegant text-center py-20">
            <DocumentTextIcon className="h-16 w-16 text-white/40 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">No Orders Yet</h2>
            <p className="text-white/60 mb-8">You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <Link href="/" className="btn-elegant px-8 py-3">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="card-elegant">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Order {order.orderNumber}
                        </h3>
                        <div className="flex items-center gap-4 text-white/60 text-sm">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DocumentTextIcon className="h-4 w-4" />
                            <span>{order.items} item{order.items !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gradient">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-3 mb-4">
                      {getStatusIcon(order.status)}
                      <span className={`font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      {order.trackingNumber && (
                        <span className="text-white/60 text-sm">
                          · Tracking: {order.trackingNumber}
                        </span>
                      )}
                    </div>

                    {/* Status Description */}
                    <div className="glass-dark rounded-2xl p-4 mb-4">
                      {order.status === 'processing' && (
                        <p className="text-white/80 text-sm">
                          Your order is being prepared for shipment. You'll receive tracking information once it ships.
                        </p>
                      )}
                      {order.status === 'shipped' && (
                        <p className="text-white/80 text-sm">
                          Your order has been shipped and is on its way. Track your package using the tracking number above.
                        </p>
                      )}
                      {order.status === 'delivered' && (
                        <p className="text-white/80 text-sm">
                          Your order has been successfully delivered. Thank you for your purchase!
                        </p>
                      )}
                      {order.status === 'cancelled' && (
                        <p className="text-white/80 text-sm">
                          This order has been cancelled. If you have questions, please contact customer support.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 lg:ml-6">
                    <button className="btn-elegant px-6 py-3 flex items-center gap-2">
                      <EyeIcon className="h-5 w-5" />
                      View Details
                    </button>
                    
                    {order.status === 'shipped' && order.trackingNumber && (
                      <button className="btn-glass px-6 py-3 flex items-center gap-2">
                        <TruckIcon className="h-5 w-5" />
                        Track Package
                      </button>
                    )}
                    
                    {order.status === 'delivered' && (
                      <button className="btn-glass px-6 py-3 text-sm">
                        Reorder Items
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Summary Stats */}
        {orders.length > 0 && (
          <div className="card-elegant mt-12">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">
                  {orders.length}
                </div>
                <p className="text-white/60">Total Orders</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">
                  ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </div>
                <p className="text-white/60">Total Spent</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">
                  {orders.filter(order => order.status === 'delivered').length}
                </div>
                <p className="text-white/60">Delivered</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">
                  {orders.reduce((sum, order) => sum + order.items, 0)}
                </div>
                <p className="text-white/60">Items Purchased</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
