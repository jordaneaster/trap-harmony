import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Oversized Street Hoodie",
      price: 89.99,
      images: [
        { image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
        { image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&sat=-100" },
        { image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&hue=60" }
      ],
      size: "L",
      quantity: 2
    }
  ])

  const [selectedImages, setSelectedImages] = useState({})

  const selectImage = (itemId, imageIndex) => {
    setSelectedImages(prev => ({
      ...prev,
      [itemId]: imageIndex
    }))
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id))
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 9.99
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
          <div className="bg-primary-800 rounded-lg p-12">
            <p className="text-gray-400 text-xl mb-6">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-accent-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const currentImageIndex = selectedImages[item.id] || 0
              const currentImage = item.images?.[currentImageIndex]?.image_url || item.image || "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
              
              return (
                <div key={item.id} className="bg-primary-800 rounded-lg p-4">
                  <div className="flex gap-4">
                    {/* Main Product Image */}
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={currentImage}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">Size: {item.size}</p>
                      <p className="text-accent-500 font-semibold">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-600 rounded text-white hover:border-accent-500 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-white w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-600 rounded text-white hover:border-accent-500 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Image Thumbnails */}
                  {item.images && item.images.length > 1 && (
                    <div className="flex space-x-2 mt-3 overflow-x-auto">
                      {item.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => selectImage(item.id, index)}
                          className={`flex-shrink-0 w-12 h-12 relative rounded border-2 transition-colors ${
                            currentImageIndex === index
                              ? 'border-accent-500'
                              : 'border-gray-600 hover:border-gray-400'
                          }`}
                        >
                          <Image
                            src={image.image_url}
                            alt={`${item.name} ${index + 1}`}
                            fill
                            className="object-cover rounded"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="bg-primary-800 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold text-white mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between text-white font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-accent-500 text-black py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
