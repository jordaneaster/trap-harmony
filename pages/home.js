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
    id: String(product.id), // Ensure ID is always a string
    name: product.name || 'Untitled Product',
    price: product.price || 0,
    image: product.product_images?.find(img => img.is_primary)?.image_url || 
           product.product_images?.[0]?.image_url || 
           'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: product.categories?.slug || 'uncategorized',
    slug: product.slug || `product-${product.id}`
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <div className="text-yellow-400 text-xl font-mono mb-4">Loading...</div>
          <div className="text-gray-400 text-sm">Please wait while we load the store</div>
        </div>
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
              {featuredProducts.map((product) => {
                const formattedProduct = formatProductForCard(product)
                return (
                  <ProductCard 
                    key={formattedProduct.id} 
                    product={formattedProduct} 
                  />
                )
              })}
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
