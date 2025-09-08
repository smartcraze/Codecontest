import { Resend } from 'resend'
import { otpEmailHTML } from './email-template'

const resend = new Resend(process.env.RESEND_API_KEY!)

function sendOtpEmail(email: string, otp: number) {
  resend.emails.send({
    from: 'no-reply@surajv.me',
    to: email,
    subject: 'Your OTP Code',
    html: otpEmailHTML(otp.toString(), email),
  })
}
export { sendOtpEmail }
