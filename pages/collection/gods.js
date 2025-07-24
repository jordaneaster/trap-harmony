import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import { motion, PanInfo } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { getCollection, getCollectionProducts } from '../../lib/collectionService'
import GodsCollectionHero from '../../components/heroes/GodsCollectionHero'

export default function GodsCollectionPage() {
  const router = useRouter()
  const [collection, setCollection] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  const sacredVariantsRef = useRef(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Fetch all data at once
        const { collection: collectionData, products: productsData } = await getCollectionProducts('gods')
        
        setCollection(collectionData)
        setProducts(productsData)
        
        console.log('Collection loaded with variants:', collectionData?.variants?.length || 0)
      } catch (error) {
        console.error('Error fetching gods collection:', error)
        // Fallback to default config if fetching fails
        setCollection({
          hero_config: {
            title: 'GODS DON\'T SLEEP',
            subtitle: 'Sacred Geometry Collection',
            description: 'Experience the mystical power of the all-seeing eye through premium streetwear.',
            ctaText: 'STAY VIGILANT',
            features: ['Premium Cotton', 'Sacred Design', 'Limited Edition', 'Sustainable']
          },
          variants: []
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const colorVariations = useMemo(() => {
    if (!collection?.variants || collection.variants.length === 0) {
      console.log('No variants found in collection')
      return []
    }
    console.log('Using variants from collection:', collection.variants.map(v => v.variantColor))
    return collection.variants
  }, [collection])

  const nextColor = () => {
    if (colorVariations.length === 0) return
    setCurrentColorIndex((prev) => (prev + 1) % colorVariations.length)
  }

  const prevColor = () => {
    if (colorVariations.length === 0) return
    setCurrentColorIndex((prev) => (prev - 1 + colorVariations.length) % colorVariations.length)
  }

  const handleVariantClick = (variation) => {
    router.push(`/product/${variation.productSlug}?color=${variation.variantColor}&variant=${variation.sku}`)
  }

  const scrollToSacredVariants = () => {
    sacredVariantsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleVariantSwipe = (event, info) => {
    const threshold = 30 // Reduced from 50 to make it more sensitive
    if (info.offset.x > threshold) {
      prevColor()
    } else if (info.offset.x < -threshold) {
      nextColor()
    }
  }

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="text-center">
            <div className="text-yellow-400 text-xl font-mono mb-4">Loading Gods Collection...</div>
            <div className="text-gray-400 text-sm">Please wait while we load the sacred variants</div>
          </div>
        </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      {/* <GodsCollectionHero 
        heroConfig={collection?.hero_config} 
        onCtaClick={scrollToSacredVariants}
      /> */}
      
      {/* Mystical Color Casket Section */}
      <section 
        ref={sacredVariantsRef}
        className="py-16 md:py-32 bg-black/90 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}


          {/* 3D Color Casket Viewer */}
          <motion.div 
            className="relative h-64 md:h-96 flex items-center justify-center"
            style={{ perspective: '2000px' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.05} // Reduced from 0.1 for snappier feel
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragEnd={handleVariantSwipe}
          >
            {/* Mystical Background Effects */}
            <div className="absolute inset-0 bg-gradient-radial from-gray-800/20 via-transparent to-transparent rounded-full" />
            
            {colorVariations.map((variation, index) => {
              const offset = index - currentColorIndex
              
              // Handle wrap-around positioning
              let position = offset
              if (position > colorVariations.length / 2) position = position - colorVariations.length
              if (position < -colorVariations.length / 2) position = position + colorVariations.length
              
              const absPosition = Math.abs(position)
              const isCenter = position === 0
              
              // Calculate 3D positioning with mobile adjustments
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
              const finalX = position * (isMobile ? 120 : 200)
              const finalZ = isCenter ? 200 : 80 - (absPosition * 20)
              const finalY = isCenter ? 0 : absPosition * 10
              const finalRotateY = isCenter ? 0 : position * 15
              const finalRotateX = isCenter ? 0 : 5
              const finalScale = isCenter ? (isMobile ? 1.1 : 1.3) : 1 - (absPosition * 0.15)
              const finalOpacity = absPosition <= 2 ? 1 - (absPosition * 0.2) : 0

              return (
                <motion.div
                  key={variation.id}
                  className="absolute cursor-pointer group"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    zIndex: isCenter ? 100 : 50 - absPosition
                  }}
                  initial={{ 
                    y: 400, 
                    opacity: 0, 
                    rotateX: 90,
                    scale: 0.3
                  }}
                  animate={{
                    x: finalX,
                    y: finalY,
                    z: finalZ,
                    rotateY: finalRotateY,
                    rotateX: finalRotateX,
                    opacity: finalOpacity,
                    scale: finalScale
                  }}
                  transition={{ 
                    duration: 0.4, // Reduced from 0.8 for faster transitions
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200, // Increased from 120 for snappier movement
                    damping: 25 // Increased from 15 for less bounce
                  }}
                  onClick={() => handleVariantClick(variation)}
                  whileHover={{ scale: isCenter ? (isMobile ? 1.15 : 1.35) : finalScale * 1.05 }}
                >
                  {/* T-shirt Card */}
                  <div 
                    className="w-48 h-60 md:w-64 md:h-80 relative rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                    style={{
                      border: isCenter ? 
                        `3px solid ${variation.glow?.replace('0.8', '0.9') || 'rgba(255,255,255,0.9)'}` : 
                        '1px solid rgba(107, 114, 128, 0.3)',
                      boxShadow: isCenter
                        ? `0 40px 80px rgba(0,0,0,0.8), 0 0 60px ${variation.glow || 'rgba(255,255,255,0.6)'}`
                        : `0 ${Math.max(finalZ/4, 5)}px ${Math.max(finalZ * 0.6, 20)}px rgba(0,0,0,0.4)`
                    }}
                  >
                    {/* Background with product image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                      {variation.images && variation.images.length > 0 && variation.images[0]?.image_url && (
                        <img
                          src={variation.images[0].image_url}
                          alt={variation.images[0].alt_text || `${variation.name} T-Shirt`}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                          onError={(e) => {
                            console.error('Image failed to load:', {
                              url: variation.images[0].image_url,
                              variant: variation.variantColor,
                              imageData: variation.images[0]
                            })
                            // Hide the image but keep the fallback
                            e.target.style.display = 'none'
                          }}
                          onLoad={() => {
                            console.log('✅ Image loaded successfully:', {
                              url: variation.images[0].image_url,
                              variant: variation.variantColor
                            })
                          }}
                        />
                      )}
                      
                      {/* Enhanced fallback */}
                      {(!variation.images || variation.images.length === 0 || !variation.images[0]?.image_url) && (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-800">
                          <div className="text-center">
                            <span className="text-6xl mb-4 block">👕</span>
                            <p className="text-sm font-mono">{variation.name}</p>
                            <p className="text-xs mt-1 opacity-75">Image Loading...</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Color accent overlay */}
                      <div 
                        className="absolute inset-0 mix-blend-multiply opacity-30"
                        style={{ backgroundColor: variation.color }}
                      />
                      
                      {/* Dark overlay for better contrast */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all" />
                    </div>

                    {/* Color indicator strip */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-2"
                      style={{ backgroundColor: variation.color }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                      {/* Text content */}
                      <div className="text-center">
                        <h3 className="text-white font-bold text-xl mb-2 font-mono tracking-wider group-hover:text-gray-200 transition-colors">
                          {variation.name}
                        </h3>
                        <p className="text-gray-300 text-sm font-mono">
                          Gods Don't Sleep
                        </p>
                        {isCenter && (
                          <motion.p 
                            className="text-gray-400 text-xs mt-2 font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            Swipe to browse colors
                          </motion.p>
                        )}
                      </div>

                      {/* Center indicator */}
                      {isCenter && (
                        <div
                          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full group-hover:scale-110 transition-transform"
                          style={{ 
                            backgroundColor: variation.color,
                            boxShadow: `0 0 40px ${variation.glow || 'rgba(255,255,255,0.6)'}`
                          }}
                        />
                      )}
                    </div>

                    {/* Glow effect for center item */}
                    {isCenter && (
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none group-hover:opacity-80 transition-opacity"
                        style={{
                          boxShadow: `0 0 80px ${variation.glow || 'rgba(255,255,255,0.6)'} inset`
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* Navigation Controls */}
            <motion.button
              onClick={prevColor}
              className="absolute left-4 md:left-20 top-1/2 transform -translate-y-1/2 z-50 p-3 md:p-4 bg-black/80 backdrop-blur-sm rounded-full text-white border border-gray-600/50 hover:bg-black/90 hover:border-white/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            <motion.button
              onClick={nextColor}
              className="absolute right-4 md:right-20 top-1/2 transform -translate-y-1/2 z-50 p-3 md:p-4 bg-black/80 backdrop-blur-sm rounded-full text-white border border-gray-600/50 hover:bg-black/90 hover:border-white/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </motion.div>

          {/* Color Dots Indicator */}
          <motion.div
            className="flex justify-center space-x-3 md:space-x-4 mt-8 md:mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {colorVariations.map((variation, index) => (
              <motion.button
                key={variation.id}
                onClick={() => setCurrentColorIndex(index)}
                className="relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div 
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    index === currentColorIndex 
                      ? 'border-white scale-125' 
                      : 'border-gray-500 hover:border-gray-300'
                  }`}
                  style={{ 
                    backgroundColor: variation.color,
                    boxShadow: index === currentColorIndex 
                      ? `0 0 20px ${variation.glow || 'rgba(255,255,255,0.6)'}` 
                      : 'none'
                  }}
                />
                
                {/* Tooltip */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white px-3 py-1 rounded-lg text-sm font-mono whitespace-nowrap">
                  {variation.name}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Swipe Instructions for Mobile */}
          <motion.div
            className="md:hidden text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-gray-400 text-sm font-mono">
              Swipe left or right to browse variants
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}