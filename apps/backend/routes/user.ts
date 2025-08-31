import { Router } from "express";
import prisma from "@repo/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema } from "@repo/zodtypes";
import { Role } from "@repo/db";
import { TOTP } from "totp-generator";
import { otpSchema } from "@repo/zodtypes";
import otpLimiter from "../middleware/otp-rate-limitter";
import base32 from "hi-base32";

const router = Router();


const otpCache = new Map<string, string>();

router.post("/signup", async(req, res) => {
    try {
        const {success, data, error} = userSchema.safeParse(req.body);
        if(!success) {
            res.status(400).json({error: error.message});
            return;
        }
        const {email, password} = data;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: Role.User
            }
        });

        res.status(201).json({
            message: "User created",
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown occured while creating user" });
        }
    }
})




router.post("/signin", async(req, res) => {
    try {
        const {success, data, error} = userSchema.safeParse(req.body);
        if(!success) {
            res.status(400).json({error: error.message});
            return;
        }
        const {email, password} = data;
        // check if user exists
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "supersecret",
            { expiresIn: "7d" }
        );


        const { otp, expires } = TOTP.generate(base32.encode(data.email + process.env.JWT_SECRET!))

        console.log(otp)

        res.status(200).json({
            message: "Authentication successful",
            token,
            otp,
            expires
        });
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occured while signing in" });
        }  
          
    }
})


router.post("/verify-otp",otpLimiter, async(req, res) => {
    try {
        const {success, data, error} = otpSchema.safeParse(req.body);
        if(!success) {
            res.status(400).json({error: error.message});
            return;
        }
        const {otp} = data;

    } catch (error) {
        
    }    
})




export default router;