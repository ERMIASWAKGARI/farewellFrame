import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

const farewellSlice = createSlice({
  name: 'farewell',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
  },
})

export const { addMessage, setMessages } = farewellSlice.actions
export default farewellSlice.reducer
