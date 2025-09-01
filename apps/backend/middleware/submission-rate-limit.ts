import rateLimit from "express-rate-limit";



export const SubmissionHourLimitRelaxedBaby = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: { message: "Too many Submission , try after an hour" }
});


