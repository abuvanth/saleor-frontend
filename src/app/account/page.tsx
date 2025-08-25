'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserIcon, EnvelopeIcon, CogIcon, KeyIcon, MapPinIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { ME_QUERY, UPDATE_ACCOUNT_MUTATION, CHANGE_PASSWORD_MUTATION } from '../../lib/auth'
import { useAuthStore } from '../../store/auth'
import toast from 'react-hot-toast'

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, setUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  const { data, loading, refetch } = useQuery(ME_QUERY, {
    skip: !isAuthenticated,
    onCompleted: (data) => {
      if (data.me) {
        setUser(data.me)
        setProfileData({
          firstName: data.me.firstName || '',
          lastName: data.me.lastName || '',
          email: data.me.email || ''
        })
      }
    }
  })

  const [updateAccount, { loading: updateLoading }] = useMutation(UPDATE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      const { user, errors } = data.accountUpdate
      
      if (errors && errors.length > 0) {
        const errorMap: Record<string, string> = {}
        errors.forEach((error: any) => {
          errorMap[error.field || 'general'] = error.message
        })
        setErrors(errorMap)
        toast.error('Failed to update profile.')
      } else if (user) {
        setUser(user)
        toast.success('Profile updated successfully!')
        refetch()
      }
    },
    onError: (error) => {
      console.error('Update account error:', error)
      toast.error('An error occurred while updating your profile.')
    }
  })

  const [changePassword, { loading: passwordLoading }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: (data) => {
      const { user, errors } = data.passwordChange
      
      if (errors && errors.length > 0) {
        const errorMap: Record<string, string> = {}
        errors.forEach((error: any) => {
          errorMap[error.field || 'general'] = error.message
        })
        setErrors(errorMap)
        toast.error('Failed to change password.')
      } else if (user) {
        toast.success('Password changed successfully!')
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
        setErrors({})
      }
    },
    onError: (error) => {
      console.error('Change password error:', error)
      toast.error('An error occurred while changing your password.')
    }
  })

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      await updateAccount({
        variables: {
          input: {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email
          }
        }
      })
    } catch (error) {
      console.error('Profile update error:', error)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!passwordData.oldPassword) newErrors.oldPassword = 'Current password is required'
    if (!passwordData.newPassword) newErrors.newPassword = 'New password is required'
    if (!passwordData.confirmPassword) newErrors.confirmPassword = 'Please confirm your new password'
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (passwordData.newPassword && passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await changePassword({
        variables: {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        }
      })
    } catch (error) {
      console.error('Password change error:', error)
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    router.push('/')
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="glass rounded-3xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-center mt-4">Loading your account...</p>
        </div>
      </div>
    )
  }

  const currentUser = data?.me || user

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            My Account
          </h1>
          <p className="text-white/80 mt-2">
            Manage your profile and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-3xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {currentUser?.firstName} {currentUser?.lastName}
                </h3>
                <p className="text-white/70 text-sm">{currentUser?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeTab === 'profile'
                      ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <UserIcon className="w-5 h-5 mr-3" />
                  Profile
                </button>
                
                <button
                  onClick={() => setActiveTab('password')}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeTab === 'password'
                      ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <KeyIcon className="w-5 h-5 mr-3" />
                  Password
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeTab === 'orders'
                      ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <ShoppingBagIcon className="w-5 h-5 mr-3" />
                  Orders
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-white/20">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass rounded-3xl p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                  
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                          className="glass-dark w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                          className="glass-dark w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="glass-dark w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
                    >
                      {updateLoading ? 'Updating...' : 'Update Profile'}
                    </button>
                  </form>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
                  
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.oldPassword}
                        onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                        className={`glass-dark w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                          errors.oldPassword ? 'ring-2 ring-red-400' : ''
                        }`}
                      />
                      {errors.oldPassword && (
                        <p className="mt-1 text-sm text-red-400">{errors.oldPassword}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className={`glass-dark w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                          errors.newPassword ? 'ring-2 ring-red-400' : ''
                        }`}
                      />
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className={`glass-dark w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                          errors.confirmPassword ? 'ring-2 ring-red-400' : ''
                        }`}
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
                    >
                      {passwordLoading ? 'Changing...' : 'Change Password'}
                    </button>
                  </form>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                  <div className="text-center py-12">
                    <ShoppingBagIcon className="w-16 h-16 text-white/50 mx-auto mb-4" />
                    <p className="text-white/70 text-lg">No orders yet</p>
                    <p className="text-white/50 text-sm mt-2">
                      When you make your first purchase, it will appear here
                    </p>
                    <Link 
                      href="/products"
                      className="inline-block mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300"
                    >
                      Start Shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
