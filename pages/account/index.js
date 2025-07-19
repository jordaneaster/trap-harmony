import { useState } from 'react'
import Link from 'next/link'

export default function AccountPage() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // Add authentication logic here
    console.log('Login attempt:', { email, password })
  }

  if (isSignedIn) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>
          <div className="bg-primary-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Account Dashboard</h2>
            <div className="space-y-4">
              <Link
                href="/account/orders"
                className="block text-gray-300 hover:text-accent-500 transition-colors"
              >
                Order History
              </Link>
              <Link
                href="/account/profile"
                className="block text-gray-300 hover:text-accent-500 transition-colors"
              >
                Profile Settings
              </Link>
              <button
                onClick={() => setIsSignedIn(false)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Sign In</h1>
        <form onSubmit={handleLogin} className="bg-primary-800 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-primary-700 border border-gray-600 rounded-lg text-white focus:border-accent-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-primary-700 border border-gray-600 rounded-lg text-white focus:border-accent-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent-500 text-black py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Sign In
          </button>
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-accent-500 hover:text-accent-400 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
