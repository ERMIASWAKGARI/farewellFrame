import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmail } from '../features/farewell/farewellAPI'

const VerifyEmail = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.auth.user)
  const isLoggedIn = Boolean(user)
  // Redirect if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/farewell') // Redirect to farewell page if logged in
    }
  }, [isLoggedIn, navigate])

  // Verify email token
  // This effect runs when the component mounts and verifies the email token

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setLoading(true)
        const response = await verifyEmail(token)
        setMessage(response.message || 'Email verified successfully!')
      } catch (error) {
        console.error('Verification error:', error)
        setMessage(
          error.response?.data?.message ||
            'Verification failed. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [token])
  // Render the verification status

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-text-primary px-4">
      <div className="p-8 bg-white/10 border border-border rounded-xl shadow-xl max-w-md w-full text-center backdrop-blur-md">
        {loading ? (
          <p className="animate-pulse">Verifying...</p>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
