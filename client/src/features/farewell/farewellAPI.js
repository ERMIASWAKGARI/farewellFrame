import axios from 'axios'

// export const API_BASE_URL = 'https://farewellframe.onrender.com/api/v1'
export const API_BASE_URL = 'http://localhost:5000/api/v1'

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

// Add to farewellApi.js
export const uploadFarewell = async (formData, token) => {
  console.log('Form data: ', formData)
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    `${API_BASE_URL}/farewells`,
    formData,
    config
  )
  return response.data
}

export const getUserFarewell = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_BASE_URL}/farewells/user`, config)
  return response.data
}
