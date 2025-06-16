const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { sendVerificationEmail } = require('../utils/emailService')

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

module.exports = {
  register,
  verifyEmail,
  login,
}
