const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require('../utils/emailService')
const catchAsync = require('../utils/catchAsync')
const {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
} = require('../utils/errors')

const register = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  console.log('Registering user:', email)

  if (!email || !password) {
    throw new ValidationError('Email and password are required')
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new ValidationError('User already exists')
  }

  // Generate a unique token for email verification
  const verificationToken = crypto.randomBytes(32).toString('hex')

  // Try to send the verification email
  await sendVerificationEmail(email, verificationToken)

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Save user to DB with isVerified: false
  const newUser = new User({
    email,
    password: hashedPassword,
    isVerified: false,
    verificationToken,
  })

  await newUser.save()

  res.status(201).json({
    message:
      'Registration successful. Please check your email to verify your account.',
  })
})

const verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.params

  console.log('Verifying email with token:', token)
  if (!token) {
    throw new ValidationError('Verification token is required.')
  }

  const user = await User.findOne({ verificationToken: token })

  if (!user) {
    throw new ValidationError('Invalid or expired verification token.')
  }

  if (user.isVerified) {
    throw new ValidationError('Email is already verified.')
  }

  user.isVerified = true
  user.verificationToken = undefined
  await user.save()

  res
    .status(200)
    .json({ message: 'Email verified successfully. You can now log in.' })
})

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new ValidationError('Email and password are required.')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthorizedError('Invalid email or password.')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new UnauthorizedError('Invalid email or password.')
  }

  if (!user.isVerified) {
    throw new UnauthorizedError('Please verify your email before logging in.')
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  res.status(200).json({
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  })
})

const resendVerificationEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body
  console.log('Resending verification email to:', email)

  if (!email) {
    throw new ValidationError('Email is required.')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFoundError('User not found.')
  }

  if (user.isVerified) {
    throw new ValidationError('User is already verified. Please log in.')
  }

  // Generate a new token and save it
  const verificationToken = crypto.randomBytes(32).toString('hex')

  // Store it in the DB
  user.verificationToken = verificationToken
  await user.save()

  // Send email
  await sendVerificationEmail(user.email, verificationToken)

  res.status(200).json({
    message: 'Verification email resent. Please check your inbox.',
  })
})

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFoundError('User not found')
  }

  const token = crypto.randomBytes(32).toString('hex')
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  user.resetPasswordToken = hashedToken
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000 // 15 min
  await user.save()

  const resetLink = `http://localhost:5173/reset-password?token=${token}`
  await sendResetPasswordEmail(email, token)

  res.status(200).json({ message: 'Reset link sent to email' })
})

const resetPassword = catchAsync(async (req, res, next) => {
  const { token, password } = req.body

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  })

  if (!user) {
    throw new ValidationError('Token is invalid or expired')
  }

  user.password = await bcrypt.hash(password, 10)
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  await user.save()

  res.status(200).json({ message: 'Password reset successful' })
})

module.exports = {
  register,
  verifyEmail,
  login,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
}
