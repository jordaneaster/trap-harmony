import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function AllProducts({ products = [] }) {
  const router = useRouter()

  const handleProductClick = (product) => {
    router.push(`/product/${product.slug}`)
  }

  // Group products by design type
  const productGroups = products.reduce((acc, product) => {
    const groupName = product.name || 'Unknown'
    if (!acc[groupName]) {
      acc[groupName] = []
    }
    acc[groupName].push(product)
    return acc
  }, {})

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono">
            Complete Collection
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore every design in the Gods Don't Sleep collection. 
            Each piece carries its own sacred energy.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="space-y-16">
          {Object.entries(productGroups).map(([groupName, groupProducts], groupIndex) => (
            <motion.div
              key={groupName}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: groupIndex * 0.1 }}
            >
              {/* Group Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-mono text-center">
                {groupName}
              </h3>

              {/* Products in this group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupProducts.map((product, productIndex) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: productIndex * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-red-500/20">
                      
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].image_url}
                            alt={product.images[0].alt_text || product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <div className="text-center text-gray-500">
                              <span className="text-4xl block mb-2">👕</span>
                              <p className="text-sm">{product.name}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                        
                        {/* Quick View Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button className="bg-white text-black px-6 py-2 rounded-lg font-bold font-mono uppercase tracking-wider transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            View Product
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h4 className="text-white font-bold text-lg mb-2 font-mono group-hover:text-red-400 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-gray-400 text-sm mb-3">
                          Gods Don't Sleep Collection
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-lg">
                            ${product.price || '25.99'}
                          </span>
                          {product.variantColor && (
                            <div 
                              className="w-6 h-6 rounded-full border-2 border-white/30"
                              style={{ backgroundColor: product.color || '#000' }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Products Fallback */}
        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold text-white mb-4 font-mono">Collection Loading...</h3>
            <p className="text-gray-400">The sacred variants are being prepared for your viewing.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
