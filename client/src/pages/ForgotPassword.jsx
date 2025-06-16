// File: src/pages/ForgotPassword.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate submit
    console.log('Reset link sent to:', email)
    setSubmitted(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="relative">
        {/* Gradient blob for flair */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary rounded-full blur-3xl opacity-20 animate-pulse" />

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-background rounded-2xl shadow-xl p-8 max-w-md w-full border border-border z-10 relative"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Forgot your password? 🔐
          </h2>

          {submitted ? (
            <p className="text-center text-text-secondary text-sm">
              If this email is registered, we’ve sent a password reset link to{' '}
              <span className="text-primary font-medium">{email}</span>.
            </p>
          ) : (
            <>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 mb-4 rounded-md border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="submit"
                className="w-full py-2 px-4 bg-button text-white rounded-md shadow hover:opacity-90 transition"
              >
                Send Reset Link
              </button>
            </>
          )}

          <div className="mt-6 text-sm text-center text-text-secondary">
            Remember your password?{' '}
            <Link to="/auth" className="text-primary underline">
              Back to login
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

export default ForgotPassword
