const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { UnauthorizedError, NotFoundError } = require('../utils/errors')
const catchAsync = require('../utils/catchAsync')

// Protect routes - verify JWT token
const protect = catchAsync(async (req, res, next) => {
  let token

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    throw new UnauthorizedError('Not authorized to access this route')
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  // Get user from DB (excluding password)
  const user = await User.findById(decoded.id).select('-password')

  if (!user) {
    throw new NotFoundError('User not found')
  }

  // Attach user to request object
  req.user = user
  next()
})

module.exports = { protect }
