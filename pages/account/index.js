import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

export default function AccountPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      setError(error.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setAuthLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      })
      if (error) throw error
      setError('Check your email to confirm your account!')
    } catch (error) {
      setError(error.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setAuthLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/account`
        }
      })
      if (error) throw error
    } catch (error) {
      setError(error.message)
      setAuthLoading(false)
    }
  }

  const handleFacebookAuth = async () => {
    setAuthLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/account`
        }
      })
      if (error) throw error
    } catch (error) {
      setError(error.message)
      setAuthLoading(false)
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error)
  }

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>
          <div className="bg-primary-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Welcome, {user.user_metadata?.first_name || user.email}!</h2>
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
                onClick={handleSignOut}
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
        {/* Optional Membership Benefits */}
        <div className="bg-accent-500 text-black rounded-lg p-4 mb-6 text-center">
          <h2 className="font-semibold mb-2">Join Our Community!</h2>
          <p className="text-sm">
            Get exclusive offers, early access to drops, and connect with fellow trap music lovers. 
            <span className="block mt-1 font-medium">Shopping without an account? No problem!</span>
          </p>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-8">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="bg-primary-800 rounded-lg p-6 space-y-4">
          {/* Social Authentication Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={authLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? (
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </button>
            
            <button
              type="button"
              onClick={handleFacebookAuth}
              disabled={authLoading}
              className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white py-3 rounded-lg font-semibold hover:bg-[#166FE5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )}
              Continue with Facebook
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-primary-800 text-gray-400">or</span>
            </div>
          </div>

          {/* Sign Up Fields */}
          {isSignUp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 bg-primary-700 border border-gray-600 rounded-lg text-white focus:border-accent-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 bg-primary-700 border border-gray-600 rounded-lg text-white focus:border-accent-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email and Password Fields */}
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

          {/* Confirm Password for Sign Up */}
          {isSignUp && (
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-primary-700 border border-gray-600 rounded-lg text-white focus:border-accent-500 focus:outline-none"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-accent-500 text-black py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {authLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>

          <p className="text-center text-gray-400 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-accent-500 hover:text-accent-400 transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          {/* Guest Shopping Option */}
          <div className="border-t border-gray-600 pt-4">
            <Link
              href="/"
              className="block text-center text-gray-400 hover:text-accent-500 transition-colors text-sm"
            >
              Continue shopping as guest →
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
