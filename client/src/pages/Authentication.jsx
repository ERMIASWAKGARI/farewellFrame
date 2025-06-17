// File: src/pages/AuthPage.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { showToast } from '../features/toast/toastSlice'

import {
  loginUser,
  registerUser,
  resendVerificationEmail,
} from '../features/farewell/farewellAPI'

const Input = ({ label, type, value, onChange, placeholder }) => (
  <div className="mb-5">
    <label className="block text-sm font-semibold text-text-primary mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
    />
  </div>
)

const AuthForm = ({ isLogin, toggleForm }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showResendForm, setShowResendForm] = useState(false)
  const [resendEmail, setResendEmail] = useState('')
  const [isResending, setIsResending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true) // Start loading

    if (!isLogin && password !== confirmPassword) {
      dispatch(
        showToast({ message: "Passwords don't match 🚨", type: 'error' })
      )
      setIsLoading(false)
      return
    }

    try {
      const userData = { email, password }

      if (isLogin) {
        const data = await loginUser(userData)
        dispatch(login(data))
        navigate('/')
      } else {
        const res = await registerUser(userData)
        console.log('register response:', res)
        setShowSuccess(true)
      }
    } catch (error) {
      console.error('Auth error:', error.response?.data || error.message)
      const serverMessage =
        error.response?.data?.message || 'Something went wrong'
      dispatch(showToast({ message: serverMessage, type: 'error' }))
    } finally {
      setIsLoading(false) // Stop loading in all cases
    }
  }

  const handleResend = async (e) => {
    e.preventDefault()
    if (!resendEmail) return

    try {
      setIsResending(true)
      await resendVerificationEmail(resendEmail)
      dispatch(
        showToast({ message: 'Verification email resent ✉️', type: 'success' })
      )
      setShowResendForm(false)
    } catch (error) {
      const serverMessage =
        error.response?.data?.message || 'Failed to resend verification email'
      dispatch(showToast({ message: serverMessage, type: 'error' }))
    } finally {
      setIsResending(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    toggleForm() // 👈 switch to login form
  }

  return (
    <div className="w-full max-w-md">
      {showSuccess ? (
        <motion.div
          className="bg-background rounded-3xl shadow-2xl p-10 border border-border backdrop-blur-md bg-opacity-80 mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-extrabold text-green-500 mb-4">
            Registration Successful 🎉
          </h3>
          <p className="text-text-secondary mb-6">
            Please check your email to verify your account before logging in.
          </p>

          <button
            onClick={handleSuccessClose}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200"
          >
            OK
          </button>

          <p className="text-sm text-text-secondary mt-4">
            Didn’t receive the email?{' '}
            <button
              className="text-primary underline font-medium"
              onClick={() => setShowResendForm(true)}
            >
              Resend
            </button>
          </p>

          {showResendForm && (
            <form onSubmit={handleResend} className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Enter your email again"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full py-2 bg-button text-white rounded-lg hover:opacity-90 transition"
                disabled={isResending}
              >
                {isResending ? 'Sending...' : 'Send Verification Email'}
              </button>
            </form>
          )}
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="bg-background rounded-3xl shadow-2xl p-10 w-full max-w-md border border-border backdrop-blur-md bg-opacity-80 mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold mb-8 text-text-primary text-center">
            {isLogin ? 'Welcome Back 🎓' : 'Create Your Account 🥳'}
          </h2>

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          {!isLogin && (
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          )}

          <button
            type="submit"
            className="w-full mt-6 py-3 px-6 bg-button text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                {isLogin ? 'Logging in...' : 'Registering...'}
              </>
            ) : isLogin ? (
              'Login'
            ) : (
              'Sign Up'
            )}
          </button>

          {isLogin && (
            <div className="mt-5 text-sm text-text-secondary text-center">
              Forgot your password?{' '}
              <Link
                to="/forgot-password"
                className="text-primary font-medium underline"
              >
                Reset it
              </Link>
            </div>
          )}

          <div className="mt-6 text-sm text-center text-text-secondary">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={toggleForm}
              className="text-primary font-medium underline"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </div>
        </motion.form>
      )}
    </div>
  )
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4 relative overflow-hidden">
      {/* Glowing floating blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20 animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-button rounded-full blur-[120px] opacity-10 animate-pulse" />

      <AuthForm isLogin={isLogin} toggleForm={() => setIsLogin(!isLogin)} />
    </div>
  )
}

export default AuthPage
