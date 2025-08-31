import {z} from "zod";


export const userSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});


export const otpSchema = z.object({
    otp: z.number().max(999999).min(100000),
});