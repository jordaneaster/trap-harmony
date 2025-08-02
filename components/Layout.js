import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  MagnifyingGlassIcon, 
  UserIcon, 
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'T-Shirts', href: '/category/tees' },
    { name: 'Hoodies', href: '/category/hoodies' },
    { name: 'Pants', href: '/category/pants' },
    { name: 'Accessories', href: '/category/accessories' },
    { name: 'Community', href: '/community/map' },
  ]

  return (
    <nav className="bg-black/95 backdrop-blur-sm sticky top-0 z-50 border-b border-red-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
                <Link href="/collection/gods" className="flex items-center group">
                <Image
                  src="https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/logos/Trap-Harmony-Final-Logo-Landscape.svg"
                  alt="Trap Harmony Logo"
                  width={150}
                  height={60}
                  priority
                  className="object-contain h-12 w-auto transition-all duration-300"
                  style={{
                    filter: 'invert(1)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.filter = 'invert(13%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(120%)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.filter = 'invert(1)';
                  }}
                />
              </Link>

                {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white p-2">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <Link href="/account" className="text-gray-300 hover:text-white p-2">
              <UserIcon className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="text-gray-300 hover:text-white p-2 relative">
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-accent-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-800">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-all duration-300 relative group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-6"></span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Image
                src="https://wwajnvjjyzsdckbjrgdq.supabase.co/storage/v1/object/public/trapnharmony/collection_001/logos/Trap-Harmony-Final-Logo-Landscape.svg"
                alt="Trap Harmony Logo"
                width={180}
                height={72}
                className="object-contain h-12 w-auto"
                style={{
                  filter: 'invert(1)',
                }}
              />
            </div>
            <p className="text-gray-400 max-w-md">
              Premium streetwear for the culture. Express your harmony through fashion.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white">Shipping</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Trap Harmony. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children, showLayout = true }) {
  if (!showLayout) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
