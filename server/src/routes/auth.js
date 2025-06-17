const express = require('express')

const {
  register,
  verifyEmail,
  login,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth')

const router = express.Router()

router.post('/register', register)
router.get('/verify-email/:token', verifyEmail)
router.post('/login', login)
router.post('/resend-verification-email', resendVerificationEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

module.exports = router
