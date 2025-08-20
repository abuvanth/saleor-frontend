import { Hero } from '@/components/Hero'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { CategoryGrid } from '@/components/CategoryGrid'
import { Newsletter } from '@/components/Newsletter'

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <Newsletter />
    </div>
  )
}
