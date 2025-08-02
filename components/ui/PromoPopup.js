import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, FireIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function PromoPopup({ isOpen, onClose }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const popupVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: -50,
      transition: { duration: 0.3 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Popup Content */}
          <motion.div
            className="relative max-w-lg w-full mx-4"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ perspective: '1000px' }}
          >
            {/* Main Card */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-red-500/30 shadow-2xl overflow-hidden">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white transition-colors bg-black/50 rounded-full backdrop-blur-sm"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              {/* Header with Logo Area */}
              <div className="relative bg-gradient-to-r from-red-600/20 to-orange-600/20 p-6 text-center border-b border-red-500/20">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ff0000\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
                
                {/* Trap Harmony Branding */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10"
                >
                  <div className="text-red-400 font-mono text-sm uppercase tracking-wider mb-2">
                    TRAP HARMONY
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono">
                    EXCLUSIVE DROP
                  </h2>
                  <div className="flex items-center justify-center space-x-2 text-orange-400">
                    <FireIcon className="w-5 h-5" />
                    <span className="font-mono text-sm">LIMITED TIME ONLY</span>
                    <FireIcon className="w-5 h-5" />
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                
                {/* Offer Details */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2 font-mono">
                    25% OFF
                  </div>
                  <p className="text-gray-300 text-lg mb-4">
                    Gods Don't Sleep Collection
                  </p>
                  <p className="text-gray-400 text-sm">
                    Get exclusive access to our sacred geometry streetwear. 
                    Premium quality, limited quantities.
                  </p>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-black/50 rounded-2xl p-4 border border-red-500/20"
                >
                  <div className="flex items-center justify-center space-x-2 mb-3 text-gray-400">
                    <ClockIcon className="w-4 h-4" />
                    <span className="font-mono text-sm uppercase">Ends In</span>
                  </div>
                  
                  <div className="flex justify-center space-x-4 text-center">
                    {[
                      { label: 'Hours', value: timeLeft.hours },
                      { label: 'Mins', value: timeLeft.minutes },
                      { label: 'Secs', value: timeLeft.seconds }
                    ].map((time) => (
                      <div key={time.label} className="flex flex-col">
                        <div className="text-2xl font-bold text-red-400 font-mono bg-gray-800/50 rounded-lg px-3 py-2 min-w-[60px]">
                          {time.value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 font-mono uppercase">
                          {time.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Promo Code */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl p-4 border border-red-500/30 text-center"
                >
                  <p className="text-gray-300 text-sm mb-2">Use code:</p>
                  <div className="text-xl font-bold text-white font-mono bg-black/50 rounded-lg py-2 px-4 inline-block border border-red-500/30">
                    GODSDEAL25
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    Auto-applied at checkout
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="space-y-3"
                >
                  <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-4 px-6 rounded-xl font-mono uppercase tracking-wider hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                  >
                    Shop Now - Save 25%
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="w-full text-gray-400 hover:text-white font-mono text-sm uppercase tracking-wider transition-colors"
                  >
                    Maybe Later
                  </button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="flex justify-center space-x-6 text-xs text-gray-500 font-mono"
                >
                  <span>✓ Free Shipping</span>
                  <span>✓ Easy Returns</span>
                  <span>✓ Premium Quality</span>
                </motion.div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-xl -z-10 scale-110" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
