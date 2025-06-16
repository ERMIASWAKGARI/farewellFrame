// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmail } from '../features/farewell/farewellAPI'

const VerifyEmail = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('')
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await verifyEmail(token)
        setMessage(response.message || 'Your email has been verified 🎉')
        setStatus('success')

        setTimeout(() => {
          navigate('/')
        }, 3000)
      } catch (error) {
        console.error('Verification error:', error)
        setMessage(
          error.response?.data?.message ||
            'Verification failed. Please try again or contact support.'
        )
        setStatus('error')
      }
    }

    verifyToken()
  }, [token, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4 relative overflow-hidden text-text-primary">
      {/* Glowing blobs for aesthetic consistency */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20 animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-button rounded-full blur-[120px] opacity-10 animate-pulse" />

      <motion.div
        className="bg-background rounded-3xl shadow-2xl p-10 w-full max-w-md border border-border backdrop-blur-md bg-opacity-80 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {status === 'loading' ? (
          <>
            <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-lg font-medium">Verifying your email...</p>
          </>
        ) : status === 'success' ? (
          <>
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Email Verified ✅
            </h2>
            <p className="text-sm mb-2">{message}</p>
            <p className="text-xs text-text-secondary">
              Redirecting to login...
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error ❌</h2>
            <p className="text-sm">{message}</p>
            <button
              onClick={() => navigate('/auth')}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
            >
              Back to Login
            </button>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default VerifyEmail
