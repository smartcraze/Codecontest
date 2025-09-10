import { Router } from 'express'
import prisma, { Role } from '@repo/db'
import jwt from 'jsonwebtoken'
import { userSchema, SigninSchema } from '@repo/zodtypes'
import { TOTP } from 'totp-generator'
import base32 from 'hi-base32'
import { OtpLimit } from '../middleware/otp-rate-limitter'
import { sendOtpEmail } from '../utils/email'

const router = Router()

const otpCache = new Map<string, string>()

router.post('/intiate-signin', async (req, res) => {
  try {
    const { success, data, error } = userSchema.safeParse(req.body)
    if (!success) {
      res.status(400).json({ error: error.message })
      return
    }
    const { email } = data

    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          role: Role.User,
        },
      })
    }

    const { otp } = TOTP.generate(
      base32.encode(email + process.env.JWT_SECRET!)
    )

    otpCache.set(email, otp)

    console.log(`OTP for ${email}: ${otp}`)

    sendOtpEmail(email, parseInt(otp, 10))

    res.status(200).json({
      message: 'OTP sent to your email',
    })
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'Unknown error during signup',
    })
  }
})

router.post('/verify-otp', OtpLimit, async (req, res) => {
  try {
    const { success, data, error } = SigninSchema.safeParse(req.body)
    if (!success) {
      res.status(400).json({ error: error.message })
      return
    }
    const { email, otp } = data

    const storedOtp = otpCache.get(email)

    const cachedOtp = storedOtp ? parseInt(storedOtp, 10) : undefined

    if (!cachedOtp || cachedOtp !== otp) {
      res.status(400).json({ error: 'Invalid or expired OTP' })
      return
    }

    otpCache.delete(email)

    const token = jwt.sign(
      {
        email,
        role: Role.User,
      },
      process.env.USER_JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    )

    res.status(200).json({
      message: 'Authentication successful',
      token,
    })
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'Unknown error during signin',
    })
  }
})

export default router
