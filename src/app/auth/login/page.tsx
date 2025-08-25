'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { LOGIN_MUTATION } from '../../../lib/auth'
import { useAuthStore } from '../../../store/auth'
import { useChannel } from '../../../hooks/useChannel'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const { setAuth, setLoading } = useAuthStore()
  const channel = useChannel()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const { token, refreshToken, user, errors } = data.tokenCreate
      
      if (errors && errors.length > 0) {
        const errorMap: Record<string, string> = {}
        errors.forEach((error: any) => {
          errorMap[error.field || 'general'] = error.message
        })
        setErrors(errorMap)
        toast.error('Login failed. Please check your credentials.')
      } else if (token && user) {
        setAuth(user, token, refreshToken)
        toast.success(`Welcome back, ${user.firstName || user.email}!`)
        router.push('/')
      }
    },
    onError: (error) => {
      console.error('Login error:', error)
      toast.error('An error occurred during login. Please try again.')
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    if (!channel) {
      toast.error('Channel not available. Please try again.')
      setLoading(false)
      return
    }

    try {
      await loginMutation({
        variables: {
          email: formData.email,
          password: formData.password
        }
      })
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!channel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="glass rounded-3xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-center mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-ocean flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-lg w-full space-y-8 relative z-10">
        <div className="card-elegant backdrop-blur-2xl border-2 border-white/30 animate-slide-up">
          {/* Enhanced header */}
          <div className="text-center mb-10">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-2xl">
                <UserIcon className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gradient-elegant text-shadow mb-3">
              Welcome Back
            </h2>
            <p className="text-lg text-white/80 font-light">
              Sign in to your account to continue your shopping journey
            </p>
          </div>

          {/* Enhanced login form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-white/90 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-6 w-6 text-white/60" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input-field-dark pl-12 pr-4 py-4 text-lg focus:ring-4 focus:ring-purple-500/50 ${
                    errors.email ? 'ring-4 ring-red-400/50 border-red-400' : ''
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-400 flex items-center gap-2 animate-slide-in-left">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-white/90 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-6 w-6 text-white/60" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input-field-dark pl-12 pr-14 py-4 text-lg focus:ring-4 focus:ring-purple-500/50 ${
                    errors.password ? 'ring-4 ring-red-400/50 border-red-400' : ''
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors focus-elegant"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400 flex items-center gap-2 animate-slide-in-left">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="glass-dark border-2 border-red-400/50 rounded-2xl p-4 animate-slide-in-left">
                <p className="text-red-400 text-center font-medium">{errors.general}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-elegant py-4 px-6 text-lg font-semibold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-3"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Sign In to Your Account
                </span>
              )}
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </button>
          </form>

          {/* Enhanced footer links */}
          <div className="mt-10 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black/20 text-white/60 rounded-full">Or continue with</span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-white/70 text-lg">
                Don't have an account?{' '}
                <Link 
                  href="/auth/signup" 
                  className="text-gradient font-semibold hover:underline transition-all duration-300 hover:scale-105 inline-block"
                >
                  Sign up here
                </Link>
              </p>
              
              <p className="text-white/70">
                <Link 
                  href="/auth/forgot-password" 
                  className="text-purple-300 hover:text-purple-200 font-medium transition-colors underline hover:no-underline"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 hover:scale-105 glass-dark px-6 py-3 rounded-2xl backdrop-blur-xl"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
