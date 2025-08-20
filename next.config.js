/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'your-saleor-domain.com', 'demo.saleor.io'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    SALEOR_API_URL: process.env.SALEOR_API_URL,
  },
}

module.exports = nextConfig
