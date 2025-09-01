import {z} from "zod";


export const userSchema = z.object({
    email: z.email()
});


export const  SigninSchema = z.object({
    email: z.email(),
    otp: z.number().max(999999).min(100000)
});



export const PaginationSchema = z.object({
    offset: z.string().optional(),
    page: z.string().optional()
})

export const ContestIdSchema = z.object({
    contestId: z.uuid()
})


export const ChallengeIdSchema = z.object({
    challengeId: z.uuid(),
    contestId: z.uuid()
});