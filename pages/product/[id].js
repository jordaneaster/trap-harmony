import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getProductById } from '../../lib/supabaseService'
import ProductGallery from '../../components/ProductGallery'

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return
      
      setLoading(true)
      try {
        const productData = await getProductById(parseInt(id))
        setProduct(productData)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    // Add to cart logic here
    console.log('Added to cart:', { product, size: selectedSize, quantity })
  }

  const getProductImages = () => {
    if (!product?.product_images || product.product_images.length === 0) {
      return [{ image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' }]
    }
    return product.product_images.sort((a, b) => {
      if (a.is_primary && !b.is_primary) return -1
      if (!a.is_primary && b.is_primary) return 1
      return 0
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Product not found</div>
          <Link
            href="/"
            className="inline-block bg-accent-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Gallery */}
          <div>
            <ProductGallery images={getProductImages()} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-accent-500">
                ${product.sale_price || product.price}
              </p>
              {product.sale_price && (
                <p className="text-gray-400 text-xl line-through">
                  ${product.price}
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description || product.short_description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border rounded-lg font-semibold transition-colors ${
                      selectedSize === size
                        ? 'border-accent-500 bg-accent-500 text-black'
                        : 'border-gray-600 text-white hover:border-accent-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-600 rounded-lg text-white hover:border-accent-500 transition-colors"
                >
                  -
                </button>
                <span className="text-white text-lg font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-600 rounded-lg text-white hover:border-accent-500 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-accent-500 text-black py-4 rounded-lg text-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              Add to Cart - ${((product.sale_price || product.price) * quantity).toFixed(2)}
            </button>

            {/* Product Details */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Product Details</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Premium quality materials</li>
                <li>• Machine washable</li>
                <li>• Regular fit</li>
                <li>• Imported</li>
                {product.sku && <li>• SKU: {product.sku}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
