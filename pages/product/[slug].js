import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getProductBySlug } from '../../lib/supabaseService'
import ProductGallery from '../../components/ProductGallery'
import { motion } from 'framer-motion'

export default function ProductPage() {
  const router = useRouter()
  const { slug, color, variant } = router.query
  
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedColor, setSelectedColor] = useState(color || null)
  const [selectedSize, setSelectedSize] = useState('M')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return
      
      setLoading(true)
      setError(null)
      
      try {
        console.log('Fetching product with slug:', slug)
        
        // Use the slug-based service function
        const productData = await getProductBySlug(slug)
        console.log('Product data received:', productData)

        if (!productData) {
          setError('Product not found')
          return
        }

        // Transform the data to match frontend structure
        const transformedProduct = {
          ...productData,
          variants: productData.product_variants?.map(variant => ({
            id: variant.id,
            color: variant.color,
            name: getColorDisplayName(variant.color),
            sku: variant.sku,
            size: variant.size,
            price: parseFloat(variant.price) || parseFloat(productData.price),
            stock_quantity: variant.stock_quantity,
            hex_color: getHexColor(variant.color),
            images: productData.product_images?.filter(img => 
              img.color_variant === variant.color || 
              (!img.color_variant && !img.variant_id)
            ) || productData.product_images || []
          })) || [],
          // If no variants, create a default one from main product
          ...((!productData.product_variants || productData.product_variants.length === 0) && {
            variants: [{
              id: 'default',
              color: 'default',
              name: productData.name,
              sku: productData.sku,
              price: parseFloat(productData.price),
              stock_quantity: productData.stock_quantity,
              hex_color: '#000000',
              images: productData.product_images || []
            }]
          }),
          price: parseFloat(productData.price),
          sale_price: productData.sale_price ? parseFloat(productData.sale_price) : null
        }

        console.log('Transformed product:', transformedProduct)
        setProduct(transformedProduct)
        
        // Set the selected variant based on color parameter or first available
        let targetVariant
        if (color && transformedProduct.variants) {
          targetVariant = transformedProduct.variants.find(v => v.color === color)
        }
        if (!targetVariant && transformedProduct.variants?.length > 0) {
          targetVariant = transformedProduct.variants[0]
        }
        
        setSelectedVariant(targetVariant)
        setSelectedColor(targetVariant?.color || null)
        
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [slug, color])

  // Helper functions for color mapping - make these more generic
  const getColorDisplayName = (color) => {
    if (!color) return 'Default'
    
    const colorMap = {
      'midnight black': 'Midnight Black',
      'black': 'Midnight Black',
      'white': 'Pure White',
      'red': 'Sacred Red',
      'yellow': 'Divine Gold',
      'blue': 'Ocean Blue',
      'green': 'Forest Green',
      'purple': 'Royal Purple',
      'pink': 'Rose Pink',
      'gray': 'Stone Gray',
      'grey': 'Stone Grey'
    }
    
    return colorMap[color.toLowerCase()] || color.charAt(0).toUpperCase() + color.slice(1)
  }

  const getHexColor = (color) => {
    if (!color) return '#000000'
    
    const hexMap = {
      'midnight black': '#000000',
      'black': '#000000',
      'white': '#FFFFFF',
      'red': '#DC2626',
      'yellow': '#EAB308',
      'blue': '#2563EB',
      'green': '#16A34A',
      'purple': '#9333EA',
      'pink': '#EC4899',
      'gray': '#6B7280',
      'grey': '#6B7280'
    }
    
    return hexMap[color.toLowerCase()] || '#000000'
  }

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId)
    const variant = product.variants.find(v => v.color === colorId)
    setSelectedVariant(variant)
    
    // Update URL without page reload
    router.push(
      `/product/${slug}?color=${colorId}&variant=${variant.sku}`,
      undefined,
      { shallow: true }
    )
  }

  const addToCart = async () => {
    if (!selectedVariant) return
    
    const cartItem = {
      product_id: product.id,
      variant_id: selectedVariant.id,
      color: selectedVariant.color,
      size: selectedSize,
      quantity: 1,
      price: selectedVariant.price,
      sku: selectedVariant.sku,
      product_name: product.name,
      variant_name: selectedVariant.name
    }
    
    console.log('Adding to cart:', cartItem)
    
    // TODO: Implement cart functionality with Supabase
    // For now, show success message
    alert(`Added ${product.name} (${selectedVariant.name}, Size: ${selectedSize}) to cart!`)
  }

  const getCollectionSlug = () => {
    // Determine collection based on product data or slug patterns
    if (product?.collection_id) {
      return product.collection_id.replace('collection_', '')
    }
    // Fallback logic based on product name or other attributes
    if (product?.name?.toLowerCase().includes('gods')) return 'gods'
    if (product?.name?.toLowerCase().includes('element')) return 'elements'
    if (product?.name?.toLowerCase().includes('heart')) return 'hearts'
    return 'collection'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl font-mono">Loading product...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-white text-xl font-mono mb-4">
            {error || 'Product not found'}
          </div>
          <button 
            onClick={() => router.push('/')}
            className="bg-accent-500 text-black px-6 py-2 rounded-lg font-mono hover:bg-accent-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm font-mono">
          <span className="text-gray-400">
            <span 
              className="hover:text-white cursor-pointer"
              onClick={() => router.push('/')}
            >
              Home
            </span>
            {' / '}
            <span 
              className="hover:text-white cursor-pointer"
              onClick={() => router.push(`/collection/${getCollectionSlug()}`)}
            >
              Collection
            </span>
            {' / '}
            <span className="text-white">{product.name}</span>
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Product Gallery */}
          <div>
            <ProductGallery 
              images={selectedVariant?.images || product.product_images || []} 
              productName={`${product.name}${selectedVariant?.name ? ` - ${selectedVariant.name}` : ''}`}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold font-mono mb-4">
                {product.name}
              </h1>
              <p className="text-3xl text-accent-500 font-bold mb-6 font-mono">
                ${selectedVariant?.price || product.price}
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>
              
              {/* Sale Price */}
              {(selectedVariant?.sale_price || product.sale_price) && (
                <div className="flex items-center space-x-3 mt-4">
                  <span className="text-2xl font-bold text-red-500 font-mono">
                    ${selectedVariant?.sale_price || product.sale_price}
                  </span>
                  <span className="text-lg text-gray-500 line-through font-mono">
                    ${selectedVariant?.price || product.price}
                  </span>
                  <span className="text-sm bg-red-500 text-white px-2 py-1 rounded font-mono">
                    SALE
                  </span>
                </div>
              )}
            </motion.div>

            {/* Color Selection */}
            {product.variants && product.variants.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 font-mono">
                  Color: {selectedVariant?.name || 'Select Color'}
                </h3>
                <div className="flex space-x-4">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleColorChange(variant.color)}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        selectedColor === variant.color
                          ? 'border-white scale-110'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                      style={{ 
                        backgroundColor: variant.hex_color,
                        boxShadow: selectedColor === variant.color 
                          ? `0 0 20px ${variant.hex_color}40` 
                          : 'none'
                      }}
                      title={variant.name}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Size Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 font-mono">Size</h3>
              <div className="flex space-x-3">
                {product.variants?.map(variant => variant.size).filter((size, index, self) => self.indexOf(size) === index).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border font-mono transition-colors ${
                      selectedSize === size
                        ? 'border-white bg-white text-black'
                        : 'border-gray-600 hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                )) || ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border font-mono transition-colors ${
                      selectedSize === size
                        ? 'border-white bg-white text-black'
                        : 'border-gray-600 hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Stock Status */}
            {product.manage_stock && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <div className={`text-sm font-mono ${
                  (selectedVariant?.stock_quantity || product.stock_quantity) > 0 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {(selectedVariant?.stock_quantity || product.stock_quantity) > 0 
                    ? `${selectedVariant?.stock_quantity || product.stock_quantity} in stock`
                    : 'Out of stock'
                  }
                </div>
              </motion.div>
            )}

            {/* Add to Cart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <button 
                onClick={addToCart}
                disabled={!selectedVariant || (product.manage_stock && (selectedVariant?.stock_quantity || product.stock_quantity) <= 0)}
                className="w-full bg-accent-500 text-black py-4 text-lg font-bold font-mono hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {(product.manage_stock && (selectedVariant?.stock_quantity || product.stock_quantity) <= 0) 
                  ? 'OUT OF STOCK' 
                  : `ADD TO CART - $${selectedVariant?.sale_price || selectedVariant?.price || product.sale_price || product.price}`
                }
              </button>
              
              <div className="text-sm text-gray-400 font-mono space-y-1">
                <p>SKU: {selectedVariant?.sku || product.sku}</p>
                {product.brand && <p>Brand: {product.brand}</p>}
                {product.weight && <p>Weight: {product.weight}g</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}