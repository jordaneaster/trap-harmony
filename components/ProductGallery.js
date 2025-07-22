import { useState, useRef } from 'react'
import Image from 'next/image'

export default function ProductGallery({ images, productName }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const imageRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  const handleTouchMove = (e) => {
    if (!isZoomed || !imageRef.current) return
    
    const touch = e.touches[0]
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
    if (!isZoomed) {
      setZoomPosition({ x: 50, y: 50 })
    }
  }

  if (!images || images.length === 0) {
    images = [{ image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' }]
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative overflow-hidden rounded-lg bg-primary-800">
        <div
          ref={imageRef}
          className={`relative w-full h-full cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
          onClick={toggleZoom}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <Image
            src={images[selectedImageIndex]?.image_url || images[0]?.image_url}
            alt={productName}
            fill
            className={`object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : {}
            }
          />
          {/* Zoom indicator */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImageIndex === index
                  ? 'border-accent-500'
                  : 'border-gray-600 hover:border-gray-400'
              }`}
            >
              <Image
                src={image.image_url}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
