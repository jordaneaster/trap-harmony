import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="bg-primary-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              ${product.price}
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
