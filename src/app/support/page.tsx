'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Free shipping is available on orders over $100.',
    category: 'Shipping'
  },
  {
    id: '2',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unused items in original packaging. Returns are free and easy with our prepaid return labels.',
    category: 'Returns'
  },
  {
    id: '3',
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track orders in your account dashboard.',
    category: 'Orders'
  },
  {
    id: '4',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship internationally to most countries. International shipping rates and delivery times vary by destination.',
    category: 'Shipping'
  },
  {
    id: '5',
    question: 'How do I change or cancel my order?',
    answer: 'Contact us immediately if you need to change or cancel your order. We can only make changes before the order ships.',
    category: 'Orders'
  }
]

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ['All', 'Shipping', 'Returns', 'Orders', 'Payment', 'Account']

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Message sent successfully! We\'ll get back to you soon.')
    setContactForm({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen gradient-ocean section-padding">
      <div className="container-max max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="btn-glass p-3 rounded-xl">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gradient-elegant">Support Center</h1>
            <p className="text-white/80 mt-2">Get help with your orders and account</p>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card-elegant text-center group hover:scale-105 transition-all duration-300">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-white font-bold mb-2">Live Chat</h3>
            <p className="text-white/60 text-sm mb-4">Get instant help from our support team</p>
            <button className="btn-elegant w-full">Start Chat</button>
          </div>

          <div className="card-elegant text-center group hover:scale-105 transition-all duration-300">
            <EnvelopeIcon className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-white font-bold mb-2">Email Support</h3>
            <p className="text-white/60 text-sm mb-4">Send us a detailed message</p>
            <button className="btn-glass w-full">Send Email</button>
          </div>

          <div className="card-elegant text-center group hover:scale-105 transition-all duration-300">
            <PhoneIcon className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-white font-bold mb-2">Phone Support</h3>
            <p className="text-white/60 text-sm mb-4">Call us during business hours</p>
            <p className="text-white font-mono text-lg">1-800-SUPPORT</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'glass-dark text-white/80 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <details key={faq.id} className="glass-dark rounded-2xl p-6 group">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      <QuestionMarkCircleIcon className="h-5 w-5 text-purple-400 flex-shrink-0" />
                      <h4 className="text-white font-medium group-hover:text-purple-300 transition-colors duration-300">
                        {faq.question}
                      </h4>
                    </div>
                    <span className="text-white/60 text-xl group-open:rotate-45 transition-transform duration-300">+</span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                    <span className="inline-block mt-3 px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      {faq.category}
                    </span>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            
            <div className="card-elegant">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-field-dark"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="input-field-dark"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="input-field-dark"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="input-field-dark h-32 resize-none"
                    placeholder="Please describe your issue or question in detail..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-elegant w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <EnvelopeIcon className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Response Time Info */}
            <div className="glass-dark rounded-2xl p-6 mt-6">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-purple-400" />
                Response Times
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-400" />
                  <span className="text-white/80">Live Chat: Instant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-400" />
                  <span className="text-white/80">Email: Within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-400" />
                  <span className="text-white/80">Phone: Mon-Fri 9AM-6PM EST</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="card-elegant mt-12">
          <h3 className="text-xl font-bold text-white mb-6">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/account/orders" className="glass-dark rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
              <DocumentTextIcon className="h-8 w-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-bold mb-2">Order History</h4>
              <p className="text-white/60 text-sm">View and track your orders</p>
            </Link>

            <div className="glass-dark rounded-2xl p-6 hover:scale-105 transition-all duration-300 group cursor-pointer">
              <DocumentTextIcon className="h-8 w-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-bold mb-2">Size Guide</h4>
              <p className="text-white/60 text-sm">Find your perfect fit</p>
            </div>

            <div className="glass-dark rounded-2xl p-6 hover:scale-105 transition-all duration-300 group cursor-pointer">
              <DocumentTextIcon className="h-8 w-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-bold mb-2">Care Instructions</h4>
              <p className="text-white/60 text-sm">Product care and maintenance</p>
            </div>

            <div className="glass-dark rounded-2xl p-6 hover:scale-105 transition-all duration-300 group cursor-pointer">
              <DocumentTextIcon className="h-8 w-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-bold mb-2">Warranty Info</h4>
              <p className="text-white/60 text-sm">Product warranties and coverage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
