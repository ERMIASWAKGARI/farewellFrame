const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const farewellRoutes = require('./routes/farewell')
const path = require('path')

const connectDB = require('./config/db')

const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Middleware
app.use(cors())
app.use(express.json())

connectDB()

//cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/farewells', farewellRoutes)

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
