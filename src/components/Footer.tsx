'use client'

import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Shop': [
      { name: 'All Products', href: '/products' },
      { name: 'Categories', href: '/categories' },
      { name: 'New Arrivals', href: '/products?filter=new' },
      { name: 'Sale', href: '/products?filter=sale' },
    ],
    'Customer Service': [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  }

  return (
    <footer className="relative mt-20">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-10 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative glass-dark backdrop-blur-2xl border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 block">
                HyraBuy
              </Link>
              <p className="text-white/80 mb-6 max-w-md leading-relaxed">
                Your trusted destination for quality products and exceptional shopping experience. 
                Discover, shop, and enjoy the best deals online.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="glass-dark p-3 text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200 group">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="glass-dark p-3 text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200 group">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.864 3.708 13.713 3.708 12.416s.49-2.448 1.418-3.323C6.001 8.218 7.152 7.728 8.449 7.728s2.448.49 3.323 1.365c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.875-2.026 1.349-3.323 1.349zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.875-.875-1.365-2.026-1.365-3.323s.49-2.448 1.365-3.323c.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.875-2.026 1.349-3.323 1.349z"/>
                  </svg>
                </a>
                <a href="#" className="glass-dark p-3 text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200 group">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="glass rounded-2xl p-6 border border-white/10 hover:bg-white/5 transition-all duration-300">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="glass rounded-2xl mt-12 p-6 flex flex-col lg:flex-row justify-between items-center border border-white/20">
            <p className="text-white/60 text-sm">
              © {currentYear} HyraBuy. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 lg:mt-0">
              <span className="text-white/60 text-sm">We accept:</span>
              <div className="flex space-x-3">
                <div className="glass-dark w-10 h-6 rounded-lg text-xs flex items-center justify-center text-white/70 font-bold border border-white/20">
                  VISA
                </div>
                <div className="glass-dark w-10 h-6 rounded-lg text-xs flex items-center justify-center text-white/70 font-bold border border-white/20">
                  MC
                </div>
                <div className="glass-dark w-10 h-6 rounded-lg text-xs flex items-center justify-center text-white/70 font-bold border border-white/20">
                  PP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
