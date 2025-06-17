import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import themeReducer from '../features/theme/themeSlice'
import toastReducer from '../features/toast/toastSlice'

// Load initial state from localStorage
const preloadedState = {
  auth: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  },
}

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    toast: toastReducer,
  },
  preloadedState,
})
