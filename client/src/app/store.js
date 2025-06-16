import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import farewellReducer from '../features/farewell/farewellSlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    farewell: farewellReducer,
    auth: authReducer, // 👈 Register it
  },
})
