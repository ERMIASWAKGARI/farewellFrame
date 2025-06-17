import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData)
  console.log('register response:', response)
  return response.data
}

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, userData)
  return response.data
}

export const verifyEmail = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/auth/verify-email/${token}`)
  console.log('verify email response:', response)
  return response.data
}

export const resendVerificationEmail = async (email) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/resend-verification-email`,
    {
      email,
    }
  )
  return response.data
}

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
    email,
  })
  return response.data
}

export const resetPassword = async (token, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
    token,
    password,
  })
  console.log('reset password response:', response)
  return response.data
}
