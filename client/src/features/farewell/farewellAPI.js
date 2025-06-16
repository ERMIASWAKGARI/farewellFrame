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
