import { motion } from 'framer-motion'

export default function MiddleHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Banner Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/Banner-Tees.jpg')`
        }}
      />
      
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/70 md:bg-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 md:mb-8"
          >
            <div className="bg-red-600/20 border border-red-500/50 rounded-full px-4 py-2 md:px-6 md:py-2">
              <span className="text-red-400 font-poppins text-xs md:text-sm uppercase tracking-wider font-medium">
                Premium Streetwear
              </span>
            </div>
          </motion.div> */}

          {/* Main Content */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 font-poppins leading-tight">
              Sacred Geometry
              <br />
              <span className="text-red-500">Meets Street</span>
            </h2>
            
            <p className="text-base md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto font-poppins">
              Each design carries the ancient wisdom of sacred symbols, 
              reimagined for the modern warrior who never sleeps.
            </p>
          </motion.div> */}

          {/* Featured Elements Grid */}
          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
          >
            {[{
              icon: "👁️",
              title: "All-Seeing Design",
              description: "Mystical eye patterns that transcend reality"
            },
            {
              icon: "🌹",
              title: "Sacred Rose",
              description: "Beauty emerging from thorns of adversity"
            },
            {
              icon: "⚡",
              title: "Divine Energy",
              description: "Channel the power of the eternal vigilant"
            }].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center group p-4 md:p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-poppins">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed font-poppins">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </div>

      {/* Decorative Elements - Hidden on mobile for cleaner look */}
      <div className="hidden md:block absolute top-20 left-10 w-32 h-32 border border-red-500/20 rounded-full" />
      <div className="hidden md:block absolute bottom-20 right-10 w-24 h-24 border border-white/10 transform rotate-45" />
    </section>
  )
}