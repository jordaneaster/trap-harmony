import { useState, useEffect } from 'react'
import HeroBanner from '../components/HeroBanner'
import ProductCard from '../components/ProductCard'
import { getCategories, getFeaturedProducts } from '../lib/supabaseService'
import Link from 'next/link'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [productsData, categoriesData] = await Promise.all([
          getFeaturedProducts(6),
          getCategories()
        ])
        setFeaturedProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const formatProductForCard = (product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.product_images?.find(img => img.is_primary)?.image_url || 
           product.product_images?.[0]?.image_url || 
           'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: product.categories?.slug || 'uncategorized'
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <HeroBanner />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Products</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our latest drops and most popular streetwear pieces
            </p>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={formatProductForCard(product)} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              No featured products available
            </div>
          )}
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
