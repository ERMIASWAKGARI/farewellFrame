const nodemailer = require('nodemailer')

// Function to send an email
const sendEmail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: '"Farewell Frame Support" <support@farewellframe.com>',
      to: email,
      subject: subject,
      html: html,
    })
    console.log('Email sent successfully to: ', email)
  } catch (error) {
    console.log(email)
    console.error('Error sending email: ', error)
    throw new Error('Error sending email')
  }
}

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `https://farewell-frame.vercel.app/verify-email/${verificationToken}`
  const subject = 'Verify Your Email - Farewell Frame 2025'

  const html = `
    <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 0; border: 1px solid #d1d5db; border-radius: 10px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
      <!-- Header -->
      <div style="background-color: #f97316; padding: 25px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 26px; font-weight: 600;">Farewell Frame</h1>
        <p style="margin: 5px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">A Lasting Memory for the Class of 2025</p>
      </div>

      <!-- Hero -->
      <div style="background-color: #f9fafb; padding: 30px 20px; text-align: center; border-bottom: 1px solid #d1d5db;">
        <div style="background-color: #fb923c; width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
          <span style="font-size: 36px;">🎓</span>
        </div>
        <h2 style="color: #1f2937; margin: 15px 0 10px; font-size: 22px; font-weight: 600;">You're Almost There!</h2>
        <p style="color: #4b5563; margin: 0 auto; font-size: 15px; line-height: 1.5; max-width: 80%;">
          One last step to secure your place in our digital farewell wall. Let’s make your goodbye unforgettable.
        </p>
      </div>

      <!-- Main Content -->
      <div style="padding: 30px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px;">
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
            Click the button below to verify your email and begin uploading your farewell message and photo.
          </p>

          <!-- CTA Button -->
          <a href="${verificationUrl}" 
             style="background-color: #f97316; color: white; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 500; display: inline-block; transition: all 0.3s ease; margin: 10px 0 25px;">
            Verify My Email
          </a>

          <p style="color: #4b5563; font-size: 13px; line-height: 1.5; margin: 0;">
            The link is valid for 24 hours. If you didn’t register, you can safely ignore this message.
          </p>
        </div>

        <!-- Secondary Link -->
        <div style="background-color: #f9fafb; border-radius: 6px; padding: 15px; margin-top: 20px;">
          <p style="color: #4b5563; font-size: 14px; margin: 0; text-align: center;">
            Trouble clicking the button? Copy and paste this link:<br>
            <a href="${verificationUrl}" style="color: #f97316; text-decoration: none; word-break: break-all;">${verificationUrl}</a>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #4b5563; border-top: 1px solid #d1d5db;">
        <p style="margin: 0 0 10px;">© ${new Date().getFullYear()} Farewell Frame. All rights reserved.</p>
        <div style="margin-top: 10px;">
          <a href="#" style="color: #f97316; text-decoration: none; margin: 0 10px; font-size: 11px;">Privacy Policy</a>
          <a href="#" style="color: #f97316; text-decoration: none; margin: 0 10px; font-size: 11px;">Terms</a>
          <a href="#" style="color: #f97316; text-decoration: none; margin: 0 10px; font-size: 11px;">Contact</a>
        </div>
      </div>

      <!-- Disclaimer -->
      <div style="font-size: 10px; color: #9ca3af; text-align: center; padding: 10px;">
        This is an automated email — please don’t reply.
      </div>
    </div>
  `

  await sendEmail(email, subject, html)
}

const sendResetPasswordEmail = async (email, token) => {
  const resetUrl = `https://farewell-frame.vercel.app/reset-password/${token}`
  const subject = 'Reset Your Password - Farewell Hub'

  const html = `
  <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #d1d5db;">
    <div style="background-color: #f97316; color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">Farewell Hub</h1>
      <p style="margin: 8px 0 0; font-size: 14px;">Let’s keep your memories safe</p>
    </div>
    <div style="background-color: #f9fafb; padding: 35px 30px; text-align: center;">
      <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">Reset Your Password</h2>
      <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
        You requested a password reset for your Farewell Hub account. Click below to proceed.
      </p>
      <a href="${resetUrl}" style="background-color: #fb923c; color: white; text-decoration: none; padding: 14px 30px; font-size: 16px; border-radius: 6px; display: inline-block; margin: 25px 0;">
        Reset Password
      </a>
      <p style="color: #4b5563; font-size: 13px;">
        This link expires in <strong>15 minutes</strong> for your security.
      </p>
      <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
        Didn’t request this? <a href="mailto:support@farewellhub.com" style="color: #f97316;">Let us know</a>.
      </p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #d1d5db;" />
      <p style="font-size: 12px; color: #6b7280; word-break: break-word;">
        Or copy and paste this link in your browser:<br />
        <a href="${resetUrl}" style="color: #f97316;">${resetUrl}</a>
      </p>
    </div>
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
      <p style="margin-bottom: 10px;">© ${new Date().getFullYear()} Farewell Hub. All memories preserved.</p>
      <p>
        <a href="#" style="margin: 0 10px; color: #f97316;">Support</a> |
        <a href="#" style="margin: 0 10px; color: #f97316;">Privacy</a> |
        <a href="#" style="margin: 0 10px; color: #f97316;">FAQ</a>
      </p>
      <p style="margin-top: 12px; font-size: 10px;">This is an automated message. No need to reply ✌️</p>
    </div>
  </div>
  `
  await sendEmail(email, subject, html)
}

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
}
