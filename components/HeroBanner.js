import Link from 'next/link'
import Image from 'next/image'

export default function HeroBanner() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
          TRAP
          &
          <span className="block text-accent-500">HARMONY</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Where street culture meets premium fashion. Express your harmony through style.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/category/new-arrivals"
            className="inline-block bg-accent-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Shop New Arrivals
          </Link>
          <Link
            href="/category/sale"
            className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors"
          >
            Sale Items
          </Link>
        </div>
      </div>
    </div>
  )
}
