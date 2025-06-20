import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    message: '',
    type: '', // e.g. 'success', 'error', 'info'
    visible: false,
  },
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message
      state.type = action.payload.type || 'info'
      state.visible = true
    },
    hideToast: (state) => {
      state.visible = false
      state.message = ''
      state.type = ''
    },
  },
})

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer
