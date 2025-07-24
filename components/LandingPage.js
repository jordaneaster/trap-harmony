import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function LandingPage() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [collections, setCollections] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setCollections([
        {
            id: 'collection_001',
            name: '001',
            slug: 'gods',
            image: 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/logos/Trap&Harmony-Final-Logo-Square.svg',
            description: 'Gods Don\'t Sleep',
            color: 'from-gray-900 to-black'
        },
        {
            id: 'collection_002',
            name: '002',
            slug: 'elements',
            image: 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/logos/Trap&Harmony-Final-Logo-Square.svg',
            description: 'Elements Collection',
            color: 'from-blue-600 to-blue-800'
        },
        {
            id: 'collection_003',
            name: '003',
            slug: 'hearts',
            image: 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/logos/Trap&Harmony-Final-Logo-Square.svg',
            description: 'Hearts',
            color: 'from-red-500 to-red-700'
        },
        // {
        //     id: 'collection_004',
        //     name: 'Collection 004',
        //     image: 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/logos/Trap&Harmony-Final-Logo-Square.svg',
        //     description: 'Harmony Core Collection',
        //     color: 'from-green-600 to-green-800'
        // },
        // {
        //     id: 'collection_005',
        //     name: 'Collection 005',
        //     image: 'https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/logos/Trap&Harmony-Final-Logo-Square.svg',
        //     description: 'Limited Drop Series',
        //     color: 'from-accent-500 to-accent-700'
        // }
    ])
  }, [])

  const nextCollection = () => {
    setCurrentIndex((prev) => (prev + 1) % collections.length)
  }

  const prevCollection = () => {
    setCurrentIndex((prev) => (prev - 1 + collections.length) % collections.length)
  }

  const handleSwipe = (event, info) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      prevCollection()
    } else if (info.offset.x < -threshold) {
      nextCollection()
    }
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Mobile Collections Preview */}
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-48 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleSwipe}
              >
                <motion.button
                  className={`w-full h-full bg-gradient-to-br ${collections[currentIndex]?.color} rounded-lg shadow-2xl border border-gray-500/50 p-4 flex flex-col items-center justify-center cursor-pointer`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    console.log('Mobile collection card clicked:', collections[currentIndex]?.slug)
                    if (collections[currentIndex]?.slug) {
                      router.push(`/collection/${collections[currentIndex].slug}`)
                    }
                  }}
                >
                  <div className="w-16 h-16 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 mb-4">
                    <Image
                      src={collections[currentIndex]?.image}
                      alt={collections[currentIndex]?.name}
                      width={40}
                      height={40}
                      className="brightness-0 invert"
                    />
                  </div>
                  <h4 className="text-white font-bold text-xl mb-2 font-mono tracking-wider uppercase">
                    {collections[currentIndex]?.name}
                  </h4>
                  <p className="text-gray-100 text-sm text-center font-mono tracking-wide">
                    {collections[currentIndex]?.description}
                  </p>
                  <div className="text-gray-300 text-xs mt-2 font-mono flex flex-col items-center">
                    <div className="text-lg mb-1">↑</div>
                    <span>Tap to explore • Swipe to browse</span>
                  </div>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                prevCollection()
              }}
              className="p-3 bg-black/80 backdrop-blur-sm rounded-full text-white border border-gray-600"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-2">
              {collections.map((collection, index) => (
                <motion.button
                  key={collection.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-accent-500' : 'bg-gray-500'
                  }`}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                nextCollection()
              }}
              className="p-3 bg-black/80 backdrop-blur-sm rounded-full text-white border border-gray-600"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Instructions */}
        <motion.p
          className="text-gray-400 text-center px-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Tap collection cards above to explore
        </motion.p>
      </div>
    )
  }

  // Desktop Experience
  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      <div className="text-center relative w-full h-full flex items-center justify-center">
        {/* Desktop Logo - Only visible when not hovering */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <motion.button
                className="inline-block mb-8"
                onHoverStart={() => {
                  setIsHovered(true)
                  setCurrentIndex(0)
                }}
                onClick={() => router.push('/collection/gods')}
                whileHover={{ 
                  borderColor: 'rgba(255, 193, 7, 0.5)',
                  scale: 1.05,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <Image
                    src="https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/logos/Trap&Harmony-Final-Logo-Square.svg"
                    alt="Trap & Harmony Logo"
                    width={400}
                    height={200}
                    className="mx-auto brightness-0 invert"
                    priority
                  />
                </motion.div>
              </motion.button>
              
              <motion.p
                className="text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Hover to explore collections or click for main collection
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Collections - Only when hovering */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
              onMouseLeave={() => {
                setIsHovered(false)
              }}
              style={{ perspective: '2000px' }}
            >
              {/* Collections Container */}
              <div className="relative w-full h-full flex items-center justify-center px-20 py-16">
                {collections.map((collection, index) => {
                  const offset = index - currentIndex
                  
                  // Handle wrap-around to maintain ascending order
                  let position = offset
                  if (position > 2) {
                    position = position - collections.length
                  } else if (position < -2) {
                    position = position + collections.length
                  }
                  
                  const absPosition = Math.abs(position)
                  const isCenter = position === 0
                  
                  // Calculate positioning
                  let finalX = position * 220
                  let finalZ = isCenter ? 250 : 120 - (absPosition * 30)
                  let finalY = isCenter ? 0 : absPosition * 15
                  let finalRotateY = isCenter ? 0 : position * 12
                  let finalRotateX = isCenter ? 0 : 8
                  let finalScale = isCenter ? 1.25 : 1 - (absPosition * 0.1)
                  let finalOpacity = absPosition <= 2 ? 1 - (absPosition * 0.15) : 0

                  return (
                    <motion.div
                      key={collection.id}
                      initial={{ 
                        y: 300, 
                        opacity: 0, 
                        rotateX: 90,
                        z: -200,
                        scale: 0.5
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
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 150,
                        damping: 20
                      }}
                      className="absolute cursor-pointer"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center bottom',
                        zIndex: isCenter ? 100 : 50 - absPosition
                      }}
                      onClick={() => {
                        console.log('Desktop collection clicked:', collection.slug)
                        router.push(`/collection/${collection.slug}`)
                      }}
                    >
                      {/* Visual card */}
                      <div className="w-72 h-48 relative">
                        <div 
                          className="w-full h-full rounded-xl shadow-2xl relative overflow-hidden"
                          style={{ 
                            backgroundImage: 'url(https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/logos/Logo-matte-black.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: isCenter ? 
                              (index === 0 ? '2px solid rgba(255, 255, 255, 0.6)' : // white border for collection 001
                               index === 1 ? '2px solid rgba(59, 130, 246, 0.6)' : // blue border for collection 002
                               '2px solid rgba(239, 68, 68, 0.6)') : // red border for collection 003
                              '1px solid rgba(107, 114, 128, 0.5)',
                            boxShadow: isCenter
                              ? (index === 0 ? `0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(255, 255, 255, 0.4)` : // white glow for 001
                                 index === 1 ? `0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(59, 130, 246, 0.6)` : // blue glow for 002
                                 `0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(239, 68, 68, 0.6)`) // red glow for 003
                              : `0 ${Math.max(finalZ/4, 5)}px ${Math.max(finalZ * 0.6, 20)}px rgba(0,0,0,0.4)`
                          }}
                        >
                          {/* Dark overlay for better text readability */}
                          <div className="absolute inset-0 bg-black/40 rounded-xl" />
                          
                          {/* Collection color accent strip */}
                          <div 
                            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${collection.color}`}
                          />

                          {/* Content */}
                          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                            <div className="flex justify-center mb-4">
                              {/* Removed the logo container completely */}
                            </div>

                            <div className="text-center">
                              <h4 className="text-white font-bold text-2xl mb-3 drop-shadow-lg font-mono tracking-wider uppercase">
                                {collection.name}
                              </h4>
                              <p className="text-gray-100 text-base opacity-90 drop-shadow-md font-mono tracking-wide">
                                {collection.description}
                              </p>
                            </div>

                            {/* Center indicator */}
                            {isCenter && (
                              <div
                                className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full shadow-lg ${
                                  index === 0 ? 'bg-white' : 
                                  index === 1 ? 'bg-blue-500' : 
                                  'bg-red-500'
                                }`}
                                style={{ 
                                  boxShadow: index === 0 ? '0 0 30px rgba(255, 255, 255, 0.8)' : // white glow
                                            index === 1 ? '0 0 30px rgba(59, 130, 246, 0.8)' : // blue glow
                                            '0 0 30px rgba(239, 68, 68, 0.8)' // red glow
                                }}
                              />
                            )}
                          </div>

                          {/* Collection-specific glow effect for center card */}
                          {isCenter && (
                            <div
                              className="absolute inset-0 rounded-xl pointer-events-none"
                              style={{
                                boxShadow: index === 0 ? '0 0 80px rgba(255, 255, 255, 0.4) inset' : // white for collection 001
                                          index === 1 ? '0 0 80px rgba(59, 130, 246, 0.6) inset' : // blue for collection 002
                                          '0 0 80px rgba(239, 68, 68, 0.6) inset' // red for collection 003
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}

                {/* Navigation Arrows */}
                <motion.button
                  onClick={prevCollection}
                  className="absolute left-32 top-1/2 transform -translate-y-1/2 z-100 p-3 bg-black/70 backdrop-blur-sm rounded-full text-white border border-gray-600/50 hover:bg-black/90 hover:border-accent-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </motion.button>

                <motion.button
                  onClick={nextCollection}
                  className="absolute right-32 top-1/2 transform -translate-y-1/2 z-100 p-3 bg-black/70 backdrop-blur-sm rounded-full text-white border border-gray-600/50 hover:bg-black/90 hover:border-accent-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </motion.button>

                {/* Collection Dots Indicator */}
                <motion.div
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  {collections.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-accent-500 shadow-lg' 
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        boxShadow: index === currentIndex 
                          ? '0 0 20px rgba(255,193,7,0.6)' 
                          : 'none'
                      }}
                    />
                  ))}
                </motion.div>

                {/* Center window indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-80 h-56 border-2 border-accent-500/20 rounded-xl" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
