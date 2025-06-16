// File: src/pages/AuthPage.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { loginUser, registerUser } from '../features/farewell/farewellAPI'

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
  const [showSuccess, setShowSuccess] = useState(false) // ✅ popup control

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords don't match 🚨")
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
      alert(serverMessage)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    toggleForm() // 👈 switch to login form
  }

  return (
    <>
      {/* Your existing form code below */}
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
          className="w-full mt-6 py-3 px-6 bg-button text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200"
        >
          {isLogin ? 'Login' : 'Sign Up'}
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

      {/* ✅ Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4 text-green-600">
              Registration Successful 🎉
            </h3>
            <p className="text-gray-700 mb-4">
              Please check your email to verify your account before logging in.
            </p>
            <button
              onClick={handleSuccessClose}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4 relative overflow-hidden">
      {/* Glowing floating blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20 animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-button rounded-full blur-[120px] opacity-10 animate-pulse" />

      <AuthForm isLogin={isLogin} toggleForm={() => setIsLogin(!isLogin)} />
    </div>
  )
}

export default AuthPage
