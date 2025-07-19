import { useState, useEffect } from 'react'
import HeroBanner from '../components/HeroBanner'
import ProductCard from '../components/ProductCard'
import { mockProducts, mockCategories } from '../lib/mockData'
import Link from 'next/link'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    // Get first 6 products as featured
    setFeaturedProducts(mockProducts.slice(0, 6))
  }, [])

  return (
    <div>
      <HeroBanner />
      
      {/* Categories Section */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group"
              >
                <div className="bg-primary-700 rounded-lg p-6 text-center hover:bg-primary-600 transition-colors">
                  <h3 className="text-lg font-semibold text-white group-hover:text-accent-500">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {category.count} items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Featured Products
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our latest drops and most popular streetwear pieces
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/category/all"
              className="inline-block bg-accent-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
