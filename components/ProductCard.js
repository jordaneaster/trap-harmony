import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({ product, className = '' }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = product.product_images || []
  const currentImage = images[currentImageIndex]?.image_url || '/images/placeholder-product.jpg'

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  // Format price from cents to dollars
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return (price / 100).toFixed(2)
    }
    return price || '0.00'
  }

  // Determine product link
  const getProductLink = () => {
    if (product.slug) {
      const firstVariant = product.product_variants?.[0]
      if (firstVariant?.color) {
        return `/product/${product.slug}?color=${firstVariant.color}`
      }
      return `/product/${product.slug}`
    }
    return '#'
  }

  return (
    <Link href={getProductLink()} className="group">
      <div className={`bg-primary-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 ${className}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={currentImage}
            alt={product.name || 'Product image'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Image Navigation - only show if multiple images */}
          {images.length > 1 && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => { e.preventDefault(); prevImage(); }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors flex items-center justify-center"
              >
                ←
              </button>
              <button
                onClick={(e) => { e.preventDefault(); nextImage(); }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors flex items-center justify-center"
              >
                →
              </button>
              
              {/* Image Dots */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.preventDefault(); setCurrentImageIndex(index); }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-accent-500">
              ${(product.price)}
            </span>
            <button className="bg-accent-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-accent-600 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
