import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function GodsCollectionHero({ heroConfig }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Dynamic Background with Geometric Patterns */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(192, 192, 192, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)
          `
        }}
      />

      {/* Geometric Eye Pattern Background */}
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="eyePattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#c0c0c0" strokeWidth="1"/>
              <circle cx="100" cy="100" r="30" fill="none" stroke="#e5e5e5" strokeWidth="1"/>
              <circle cx="100" cy="100" r="15" fill="#c0c0c0" fillOpacity="0.3"/>
              <polygon points="40,100 100,40 160,100 100,160" fill="none" stroke="#9ca3af" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eyePattern)" />
        </svg>
      </div>

      {/* Animated Geometric Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-gray-400/20"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 text-center">
          
          {/* Collection Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 border border-white/30 rounded-full bg-black/50 backdrop-blur-sm">
              <span className="text-white font-mono text-sm tracking-wider uppercase">
                Collection 001
              </span>
            </div>
          </motion.div>

          {/* Main Title with Eye Symbol */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-6xl md:text-8xl font-mono font-bold text-white mb-4 tracking-wider">
              {heroConfig?.title || 'GODS DON\'T SLEEP'}
            </h1>
            
            {/* Sacred Eye Symbol */}
            <motion.div
              className="flex justify-center mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="120" height="80" viewBox="0 0 120 80" className="text-white">
                <ellipse cx="60" cy="40" rx="55" ry="35" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="60" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="60" cy="40" r="10" fill="currentColor" fillOpacity="0.8"/>
                <polygon points="20,40 60,10 100,40 60,70" fill="none" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-mono tracking-wide"
          >
            {heroConfig?.subtitle || ''}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg"
          >
            {heroConfig?.description || 'Experience the mystical power of the all-seeing eye.'}
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
          >
            {(heroConfig?.features || []).map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-white/10 to-gray-600/20 rounded-lg flex items-center justify-center border border-white/20">
                  <div className="w-6 h-6 border border-white/50 transform rotate-45" />
                </div>
                <p className="text-gray-300 text-sm font-mono">{feature}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link
              href="#products"
              className="inline-block px-12 py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/25 font-mono tracking-wider"
            >
              {heroConfig?.ctaText}
            </Link>
          </motion.div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}