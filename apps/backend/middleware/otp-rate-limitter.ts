import rateLimit from "express-rate-limit";

/**
 * OTP request rate limiter:
 * - Allows max 5 OTP requests per 15 minutes per IP.
 * - Helps prevent OTP spamming and brute-force attacks.
 */

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: "Too many OTP requests from this IP, please try again after 15 minutes"
  
})

export default otpLimiter;
