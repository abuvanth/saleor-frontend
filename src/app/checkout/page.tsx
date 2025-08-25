'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  CreditCardIcon,
  ShieldCheckIcon,
  TruckIcon,
  MapPinIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useCartStore } from '../../store/cart'
import { useAuthStore } from '../../store/auth'
import toast from 'react-hot-toast'

interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'apple-pay'
  name: string
  icon: any
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const { isAuthenticated, user } = useAuthStore()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })
  const [billingAddress, setBillingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<string>('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = getTotalPrice()
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + tax + shipping

  const paymentMethods: PaymentMethod[] = [
    { id: 'card', type: 'card', name: 'Credit/Debit Card', icon: CreditCardIcon },
    { id: 'paypal', type: 'paypal', name: 'PayPal', icon: CreditCardIcon },
    { id: 'apple-pay', type: 'apple-pay', name: 'Apple Pay', icon: CreditCardIcon }
  ]

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please sign in to proceed with checkout')
      router.push('/auth/login?redirect=/checkout')
      return
    }
    
    if (items.length === 0) {
      toast.error('Your cart is empty')
      router.push('/cart')
      return
    }
  }, [isAuthenticated, items.length, router])

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      // Validate shipping address
      if (!shippingAddress.firstName) newErrors.firstName = 'First name is required'
      if (!shippingAddress.lastName) newErrors.lastName = 'Last name is required'
      if (!shippingAddress.email) newErrors.email = 'Email is required'
      if (!shippingAddress.phone) newErrors.phone = 'Phone number is required'
      if (!shippingAddress.address) newErrors.address = 'Address is required'
      if (!shippingAddress.city) newErrors.city = 'City is required'
      if (!shippingAddress.state) newErrors.state = 'State is required'
      if (!shippingAddress.zipCode) newErrors.zipCode = 'ZIP code is required'
    }

    if (step === 2 && paymentMethod === 'card') {
      // Validate payment details
      if (!cardDetails.number) newErrors.cardNumber = 'Card number is required'
      if (!cardDetails.expiry) newErrors.cardExpiry = 'Expiry date is required'
      if (!cardDetails.cvc) newErrors.cardCvc = 'CVC is required'
      if (!cardDetails.name) newErrors.cardName = 'Cardholder name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handlePlaceOrder = async () => {
    if (!validateStep(2)) return

    setIsLoading(true)
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Clear cart and redirect to success page
      clearCart()
      toast.success('Order placed successfully!')
      router.push('/order-confirmation')
      
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleCardDetailChange = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }))
    if (errors[`card${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`card${field.charAt(0).toUpperCase() + field.slice(1)}`]: '' }))
    }
  }

  if (!isAuthenticated || items.length === 0) {
    return (
      <div className="min-h-screen gradient-ocean flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-ocean section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient-elegant mb-4">Secure Checkout</h1>
          <p className="text-white/80 text-lg">Complete your order safely and securely</p>
        </div>

        {/* Progress Steps */}
        <div className="card-elegant mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: 'Shipping', icon: TruckIcon },
              { step: 2, title: 'Payment', icon: CreditCardIcon },
              { step: 3, title: 'Review', icon: CheckCircleIcon }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white' 
                    : 'border-white/30 text-white/60'
                }`}>
                  {currentStep > step ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </div>
                <span className={`ml-3 font-medium ${
                  currentStep >= step ? 'text-white' : 'text-white/60'
                }`}>
                  {title}
                </span>
                {step < 3 && (
                  <div className={`ml-8 w-16 h-0.5 ${
                    currentStep > step ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/30'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="card-elegant">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <TruckIcon className="h-6 w-6 text-purple-400" />
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">First Name</label>
                    <input
                      type="text"
                      value={shippingAddress.firstName}
                      onChange={(e) => handleAddressChange('firstName', e.target.value)}
                      className={`input-field-dark ${errors.firstName ? 'ring-2 ring-red-400' : ''}`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={shippingAddress.lastName}
                      onChange={(e) => handleAddressChange('lastName', e.target.value)}
                      className={`input-field-dark ${errors.lastName ? 'ring-2 ring-red-400' : ''}`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">Email</label>
                    <input
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) => handleAddressChange('email', e.target.value)}
                      className={`input-field-dark ${errors.email ? 'ring-2 ring-red-400' : ''}`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => handleAddressChange('phone', e.target.value)}
                      className={`input-field-dark ${errors.phone ? 'ring-2 ring-red-400' : ''}`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-white/90 mb-2">Address</label>
                    <input
                      type="text"
                      value={shippingAddress.address}
                      onChange={(e) => handleAddressChange('address', e.target.value)}
                      className={`input-field-dark ${errors.address ? 'ring-2 ring-red-400' : ''}`}
                      placeholder="Enter street address"
                    />
                    {errors.address && (
                      <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">City</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      className={`input-field-dark ${errors.city ? 'ring-2 ring-red-400' : ''}`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">State</label>
                    <select
                      value={shippingAddress.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      className={`input-field-dark ${errors.state ? 'ring-2 ring-red-400' : ''}`}
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      {/* Add more states */}
                    </select>
                    {errors.state && (
                      <p className="text-red-400 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                      className={`input-field-dark ${errors.zipCode ? 'ring-2 ring-red-400' : ''}`}
                      placeholder="Enter ZIP code"
                    />
                    {errors.zipCode && (
                      <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleNextStep}
                    className="btn-elegant px-8 py-3 flex items-center gap-2"
                  >
                    Continue to Payment
                    <CreditCardIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="space-y-8">
                {/* Payment Method Selection */}
                <div className="card-elegant">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <CreditCardIcon className="h-6 w-6 text-purple-400" />
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          paymentMethod === method.id
                            ? 'border-purple-400 bg-purple-500/20'
                            : 'border-white/20 glass-dark hover:border-white/40'
                        }`}
                      >
                        <method.icon className={`h-8 w-8 mx-auto mb-2 ${
                          paymentMethod === method.id ? 'text-purple-400' : 'text-white/60'
                        }`} />
                        <span className={`text-sm font-medium ${
                          paymentMethod === method.id ? 'text-white' : 'text-white/80'
                        }`}>
                          {method.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Card Details Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-white/90 mb-2">Card Number</label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => handleCardDetailChange('number', e.target.value)}
                          className={`input-field-dark ${errors.cardNumber ? 'ring-2 ring-red-400' : ''}`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-white/90 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => handleCardDetailChange('expiry', e.target.value)}
                            className={`input-field-dark ${errors.cardExpiry ? 'ring-2 ring-red-400' : ''}`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.cardExpiry && (
                            <p className="text-red-400 text-sm mt-1">{errors.cardExpiry}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/90 mb-2">CVC</label>
                          <input
                            type="text"
                            value={cardDetails.cvc}
                            onChange={(e) => handleCardDetailChange('cvc', e.target.value)}
                            className={`input-field-dark ${errors.cardCvc ? 'ring-2 ring-red-400' : ''}`}
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cardCvc && (
                            <p className="text-red-400 text-sm mt-1">{errors.cardCvc}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-white/90 mb-2">Cardholder Name</label>
                          <input
                            type="text"
                            value={cardDetails.name}
                            onChange={(e) => handleCardDetailChange('name', e.target.value)}
                            className={`input-field-dark ${errors.cardName ? 'ring-2 ring-red-400' : ''}`}
                            placeholder="John Doe"
                          />
                          {errors.cardName && (
                            <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-8">
                      <p className="text-white/80 mb-4">You will be redirected to PayPal to complete your payment</p>
                      <div className="glass-dark rounded-2xl p-6">
                        <CreditCardIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                        <p className="text-white font-medium">PayPal Payment</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'apple-pay' && (
                    <div className="text-center py-8">
                      <p className="text-white/80 mb-4">Use Touch ID or Face ID to pay with Apple Pay</p>
                      <div className="glass-dark rounded-2xl p-6">
                        <CreditCardIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-white font-medium">Apple Pay</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePreviousStep}
                    className="btn-glass px-8 py-3"
                  >
                    Back to Shipping
                  </button>
                  
                  <button
                    onClick={handleNextStep}
                    className="btn-elegant px-8 py-3 flex items-center gap-2"
                  >
                    Review Order
                    <CheckCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="card-elegant">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-purple-400" />
                  Review Your Order
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 glass-dark rounded-2xl p-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-xl overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UserIcon className="h-8 w-8 text-white/40" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <p className="text-white/60 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="glass-dark rounded-2xl p-6">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <MapPinIcon className="h-5 w-5 text-purple-400" />
                      Shipping Address
                    </h4>
                    <div className="text-white/80 space-y-1">
                      <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                      <p>{shippingAddress.address}</p>
                      <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                      <p>{shippingAddress.email}</p>
                      <p>{shippingAddress.phone}</p>
                    </div>
                  </div>

                  <div className="glass-dark rounded-2xl p-6">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <CreditCardIcon className="h-5 w-5 text-purple-400" />
                      Payment Method
                    </h4>
                    <div className="text-white/80">
                      {paymentMethod === 'card' && (
                        <div>
                          <p>Credit Card</p>
                          <p>**** **** **** {cardDetails.number.slice(-4)}</p>
                          <p>{cardDetails.name}</p>
                        </div>
                      )}
                      {paymentMethod === 'paypal' && <p>PayPal</p>}
                      {paymentMethod === 'apple-pay' && <p>Apple Pay</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePreviousStep}
                    className="btn-glass px-8 py-3"
                  >
                    Back to Payment
                  </button>
                  
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    className="btn-elegant px-8 py-3 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <LockClosedIcon className="h-5 w-5" />
                        Place Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <div className="card-elegant">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-white/80">
                  <span className="flex items-center gap-2">
                    <TruckIcon className="h-4 w-4" />
                    Shipping
                  </span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between text-white/80">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gradient">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badges */}
            <div className="card-elegant">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-green-400" />
                Secure Checkout
              </h4>
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="h-4 w-4 text-green-400" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-4 w-4 text-green-400" />
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-400" />
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
