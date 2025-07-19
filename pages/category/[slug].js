import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ProductCard from '../../components/ProductCard'
import { mockProducts, mockCategories } from '../../lib/mockData'

export default function CategoryPage() {
  const router = useRouter()
  const { slug } = router.query
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      setLoading(true)
      
      // Find category
      const foundCategory = mockCategories.find(cat => cat.slug === slug)
      setCategory(foundCategory)

      // Filter products by category
      if (slug === 'all') {
        setProducts(mockProducts)
      } else {
        const filteredProducts = mockProducts.filter(product => product.category === slug)
        setProducts(filteredProducts)
      }
      
      setLoading(false)
    }
  }, [slug])

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
            {category ? category.name : 'All Products'}
          </h1>
          <p className="text-gray-400">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
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
