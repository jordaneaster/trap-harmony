import { motion } from 'framer-motion'

export default function MiddleHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            #dc2626 2px,
            #dc2626 4px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="bg-red-600/20 border border-red-500/50 rounded-full px-6 py-2">
              <span className="text-red-400 font-mono text-sm uppercase tracking-wider">
                Tees
              </span>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-mono">
              Sacred Geometry
              <br />
              <span className="text-red-500">Meets Street</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Each design carries the ancient wisdom of sacred symbols, 
              reimagined for the modern warrior who never sleeps.
            </p>
          </motion.div>

          {/* Featured Elements Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
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
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-mono">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-red-500/20 rounded-full" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/10 transform rotate-45" />
    </section>
  )
}
