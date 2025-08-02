import { motion } from 'framer-motion'

export default function GodsCollectionHero({ onCtaClick }) {

  return (
    <div className="relative h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          
            <div 
              className="hero-image-container w-[95%] md:w-[85%] max-w-7xl relative h-[85vh] md:h-auto min-h-[60vh] md:min-h-0"
              style={{
                backgroundImage: `url('/images/gods-collection-hero.jpg')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                aspectRatio: '3/4',
              }}
            >
              {/* CTA Button with responsive positioning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-20"
              >
                <button
                  onClick={onCtaClick}
                  className="group relative inline-flex items-center gap-2 sm:gap-3 bg-white text-black px-4 py-2 sm:px-8 sm:py-4 rounded-lg font-bold text-sm sm:text-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg font-mono uppercase tracking-wider"
                >
                  <span>See All</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            </div>
            {/* Enhanced mobile overlay for better readability */}
        <div className="absolute inset-0 bg-black/20 sm:bg-black/10 md:bg-transparent" />
      </div>
    </div>
  )
}