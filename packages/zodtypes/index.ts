import {z} from "zod";


export const userSchema = z.object({
    email: z.email()
});


export const  SigninSchema = z.object({
    email: z.email(),
    otp: z.number().max(999999).min(100000)
});

