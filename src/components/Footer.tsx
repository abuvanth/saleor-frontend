'use client'

import Link from 'next/link'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  HeartIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Shop': [
      { name: 'All Products', href: '/products' },
      { name: 'Categories', href: '/categories' },
      { name: 'New Arrivals', href: '/products?filter=new' },
      { name: 'Best Sellers', href: '/products?filter=bestsellers' },
      { name: 'Sale', href: '/products?filter=sale' },
    ],
    'Customer Care': [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Help Center', href: '/help' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns & Exchanges', href: '/returns' },
    ],
    'Company': [
      { name: 'About HyraBuy', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Our Story', href: '/story' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Press', href: '/press' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  }

  const features = [
    {
      icon: TruckIcon,
      title: 'Free Shipping',
      description: 'On orders over $100'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Payment',
      description: '100% protected transactions'
    },
    {
      icon: HeartIcon,
      title: '24/7 Support',
      description: 'Dedicated customer service'
    },
    {
      icon: CreditCardIcon,
      title: 'Easy Returns',
      description: '30-day return policy'
    }
  ]

  return (
    <footer className="relative mt-32">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-black/20"></div>
        <div className="absolute -top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Features section */}
      <div className="relative z-10 container-max">
        <div className="card-elegant mb-16 backdrop-blur-2xl border-2 border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative glass-dark backdrop-blur-2xl border-t-2 border-white/30">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Enhanced Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="text-4xl font-bold text-gradient mb-6 block hover:scale-105 transition-transform duration-300">
                HyraBuy
              </Link>
              <p className="text-white/80 leading-relaxed text-lg">
                Your premium destination for exceptional products and unparalleled shopping experience. 
                Discover quality, embrace style, and enjoy seamless online shopping.
              </p>
              
              {/* Contact info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <EnvelopeIcon className="h-5 w-5 text-purple-400" />
                  <span>hello@hyrabuy.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <PhoneIcon className="h-5 w-5 text-purple-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <MapPinIcon className="h-5 w-5 text-purple-400" />
                  <span>New York, NY 10001</span>
                </div>
              </div>

              {/* Enhanced social links */}
              <div className="flex space-x-4 pt-4">
                <a href="#" className="glass-dark p-4 text-white/70 hover:text-white hover:bg-purple-500/20 rounded-2xl transition-all duration-300 group hover:scale-110">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="glass-dark p-4 text-white/70 hover:text-white hover:bg-pink-500/20 rounded-2xl transition-all duration-300 group hover:scale-110">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-.49-3.173-1.315-.825-.825-1.315-1.876-1.315-3.173s.49-2.348 1.315-3.173c.825-.825 1.876-1.315 3.173-1.315s2.348.49 3.173 1.315c.825.825 1.315 1.876 1.315 3.173s-.49 2.348-1.315 3.173c-.825.825-1.876 1.315-3.173 1.315zm7.718 0c-1.297 0-2.348-.49-3.173-1.315-.825-.825-1.315-1.876-1.315-3.173s.49-2.348 1.315-3.173c.825-.825 1.876-1.315 3.173-1.315s2.348.49 3.173 1.315c.825.825 1.315 1.876 1.315 3.173s-.49 2.348-1.315 3.173c-.825.825-1.876 1.315-3.173 1.315z"/>
                  </svg>
                </a>
                <a href="#" className="glass-dark p-4 text-white/70 hover:text-white hover:bg-blue-500/20 rounded-2xl transition-all duration-300 group hover:scale-110">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="glass-dark p-4 text-white/70 hover:text-white hover:bg-red-500/20 rounded-2xl transition-all duration-300 group hover:scale-110">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Enhanced Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-bold text-gradient uppercase tracking-wider">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white hover:text-gradient transition-all duration-300 hover:translate-x-2 block relative group"
                      >
                        <span className="relative z-10">{link.name}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter section */}
          <div className="card-elegant mt-16 text-center backdrop-blur-2xl border-2 border-white/30">
            <h3 className="text-3xl font-bold text-gradient mb-4">Stay in the Loop</h3>
            <p className="text-white/80 mb-8 text-lg">Subscribe to our newsletter for exclusive deals and latest updates</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field-dark flex-1 text-center sm:text-left"
              />
              <button className="btn-elegant px-8 py-4 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="card-elegant mt-16 backdrop-blur-2xl border-2 border-white/30">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <p className="text-white/60 text-lg">
                  © {currentYear} HyraBuy. Crafted with{' '}
                  <HeartIcon className="h-5 w-5 text-red-400 inline mx-1" />
                  All rights reserved.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <span className="text-white/60 text-lg font-medium">Secure payments:</span>
                <div className="flex space-x-3">
                  <div className="glass-dark w-14 h-9 rounded-xl flex items-center justify-center text-white/70 font-bold border-2 border-white/20 hover:border-purple-400/50 transition-colors">
                    VISA
                  </div>
                  <div className="glass-dark w-14 h-9 rounded-xl flex items-center justify-center text-white/70 font-bold border-2 border-white/20 hover:border-pink-400/50 transition-colors">
                    MC
                  </div>
                  <div className="glass-dark w-14 h-9 rounded-xl flex items-center justify-center text-white/70 font-bold border-2 border-white/20 hover:border-blue-400/50 transition-colors">
                    AMEX
                  </div>
                  <div className="glass-dark w-14 h-9 rounded-xl flex items-center justify-center text-white/70 font-bold border-2 border-white/20 hover:border-yellow-400/50 transition-colors">
                    PP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
