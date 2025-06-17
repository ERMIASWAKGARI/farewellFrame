// File: src/pages/ForgotPassword.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../features/farewell/farewellAPI'
import { showToast } from '../features/toast/toastSlice'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await forgotPassword(email)
      dispatch(showToast({ message: res.message, type: 'success' }))
      setSubmitted(true)
    } catch (err) {
      dispatch(
        showToast({
          message:
            err.response?.data?.message ||
            'Something went wrong. Please try again.',
          type: 'error',
        })
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="relative">
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
                className="w-full bg-button text-white rounded-md shadow hover:opacity-90 transition"
                disabled={loading}
              >
                <button
                  type="submit"
                  className="min-w-[140px] w-full py-2 px-4 bg-button text-white rounded-md shadow hover:opacity-90 transition flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send Link'
                  )}
                </button>
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
