import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ProductCard from '../../components/ProductCard'
import { getProducts, getProductsByCategory, getCategoryBySlug } from '../../lib/supabaseService'

export default function CategoryPage() {
  const router = useRouter()
  const { slug } = router.query
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!slug) return
      
      setLoading(true)
      try {
        let productsData = []
        let categoryData = null

        if (slug === 'all') {
          productsData = await getProducts()
          categoryData = { name: 'All Products', slug: 'all' }
        } else {
          const [categoryResult, productsResult] = await Promise.all([
            getCategoryBySlug(slug),
            getProductsByCategory(slug)
          ])
          categoryData = categoryResult
          productsData = productsResult
        }

        setCategory(categoryData)
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching category data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

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
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {category ? category.name : 'Category Not Found'}
          </h1>
          <p className="text-gray-400">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={formatProductForCard(product)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">
              No products found in this category
            </div>
            <Link
              href="/"
              className="inline-block bg-accent-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
