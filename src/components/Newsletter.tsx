'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would typically send the email to your backend
      // For now, we'll just simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"></div>
        <div className="absolute top-10 left-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto float">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, 
              special offers, and exclusive deals.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 glass px-6 py-4 rounded-2xl text-white placeholder-white/60 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200 border border-white/20"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold rounded-2xl hover:from-yellow-300 hover:to-orange-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              <p className="text-sm text-white/70 mt-4 bg-black/20 rounded-xl p-3 backdrop-blur-sm">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
