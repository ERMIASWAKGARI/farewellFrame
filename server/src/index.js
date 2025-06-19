const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/auth')
const farewellRoutes = require('./routes/farewell')
const path = require('path')

const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
// Database connection with retries
const connectWithRetry = async () => {
  const maxRetries = 5
  let retries = 0

  while (retries < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      console.log('Connected to MongoDB')
      return
    } catch (err) {
      retries++
      console.error(
        `MongoDB connection failed (attempt ${retries}):`,
        err.message
      )

      if (retries < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 5000))
      } else {
        console.error('Max retries reached. Could not connect to MongoDB.')
        process.exit(1)
      }
    }
  }
}

connectWithRetry()

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...')
  connectWithRetry()
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/farewells', farewellRoutes)

// Error handling middleware
// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  // Log the error
  console.error(`ERROR 💥: ${err.message}`)
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack)
  }

  // Send appropriate response
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    // Don't leak details for unknown errors
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
