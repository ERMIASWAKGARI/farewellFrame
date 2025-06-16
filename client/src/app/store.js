import { configureStore } from '@reduxjs/toolkit'
import farewellReducer from '../features/farewell/farewellSlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    farewell: farewellReducer,
  },
})
