import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsSubmitting(false)
      // Reset form after success message
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail('')
        setFirstName('')
        setLastName('')
      }, 3000)
    }, 1500)
  }

  return (
    <section className="bg-red-600 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4 font-poppins leading-tight"
          >
            Join the Trap&Harmony Family
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm md:text-base text-white/90 font-poppins"
          >
            Get exclusive drops, early access, and 10% off your first order
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
              {/* Mobile: Stack all inputs vertically */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                {/* First Name */}
                <div className="flex-1">
                  <label htmlFor="firstName" className="sr-only">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 font-poppins text-sm md:text-base"
                  />
                </div>

                {/* Last Name */}
                <div className="flex-1">
                  <label htmlFor="lastName" className="sr-only">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 font-poppins text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Email and Button Row */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:items-end">
                {/* Email */}
                <div className="flex-1">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 font-poppins text-sm md:text-base"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto px-6 md:px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-poppins uppercase tracking-wider min-w-[120px] text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  ) : (
                    'Join Now'
                  )}
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 md:py-8"
            >
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">✅</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-poppins">Welcome to the Family!</h3>
              <p className="text-sm md:text-base text-white/90 font-poppins">Check your email for your 10% discount code.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
