'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden gradient-ocean">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20"></div>
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="text-center">
          {/* Floating glass card */}
          <div className="glass rounded-3xl p-8 mb-8 float max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Welcome to HyraBuy
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 animate-fade-in backdrop-blur-sm">
              Discover amazing products with our modern shopping experience. 
              Quality, style, and convenience all in one place.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
            <Link 
              href="/products" 
              className="group relative overflow-hidden"
            >
              <div className="btn-glass bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white border-white/30">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
            <Link 
              href="/categories" 
              className="group relative overflow-hidden"
            >
              <div className="btn-glass bg-gradient-to-r from-black/20 to-black/10 hover:from-black/30 hover:to-black/20 text-white border-white/20">
                <span className="relative z-10">Browse Categories</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Glassmorphism decorative elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="glass-dark h-32 backdrop-blur-3xl bg-gradient-to-t from-black/30 to-transparent"></div>
        <svg
          className="w-full h-20 text-white/10"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".3"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  )
}
