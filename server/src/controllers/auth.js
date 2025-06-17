const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require('../utils/emailService')

const register = async (req, res) => {
  const { email, password } = req.body
  console.log('Registering user:', email)

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
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
  } catch (error) {
    console.error('Register Error:', error.message)
    res.status(500).json({ message: 'Registration failed. Please try again.' })
  }
}

const verifyEmail = async (req, res) => {
  const { token } = req.params

  console.log('Verifying email with token:', token)
  if (!token) {
    return res.status(400).json({ message: 'Verification token is required.' })
  }

  try {
    const user = await User.findOne({ verificationToken: token })

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired verification token.' })
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email is already verified.' })
    }

    user.isVerified = true
    user.verificationToken = undefined
    await user.save()

    return res
      .status(200)
      .json({ message: 'Email verified successfully. You can now log in.' })
  } catch (error) {
    console.error('Email Verification Error:', error.message)
    return res
      .status(500)
      .json({ message: 'Failed to verify email. Try again later.' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' })
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: 'Please verify your email before logging in.' })
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
  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ message: 'Server error. Please try again later.' })
  }
}

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body
  console.log('Resending verification email to:', email)

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: 'User is already verified. Please log in.' })
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
  } catch (err) {
    console.error('Error resending verification email:', err.message)
    res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' })
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000 // 15 min
    await user.save()

    const resetLink = `http://localhost:5173/reset-password?token=${token}`
    await sendResetPasswordEmail(email, token)

    res.status(200).json({ message: 'Reset link sent to email' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

const resetPassword = async (req, res) => {
  const { token, password } = req.body

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or expired' })
    }

    user.password = await bcrypt.hash(password, 10)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    res.status(200).json({ message: 'Password reset successful' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = {
  register,
  verifyEmail,
  login,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
}
