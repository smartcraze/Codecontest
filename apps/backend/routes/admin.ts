import { Router } from "express";
import prisma, { Role } from "@repo/db";
import { challengeSchema, SigninSchema, userSchema } from "@repo/zodtypes";
import { TOTP } from "totp-generator";
import base32 from "hi-base32";
import { sendOtpEmail } from "../utils/email";
import { OtpLimit } from "../middleware/otp-rate-limitter";
import jwt from "jsonwebtoken";




const router = Router();
const otpCache = new Map<string, string>();


router.post("/signup", async (req, res) => {
  try {
    const { success, data } = userSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ error: "Invalid request" });
      return;
    }

    const { email } = data;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          role: Role.Admin,
        }
      });
    }


    const { otp } = TOTP.generate(base32.encode(email + process.env.JWT_SECRET!));

    otpCache.set(email, otp);

    console.log(`OTP for ${email}: ${otp}`);


    sendOtpEmail(email, parseInt(otp, 10));


    res.status(200).json({
      message: "OTP sent to your email",
    });

  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error during signup",
    });
  }
})


router.post("/signin", OtpLimit, async (req, res) => {
  try {
    const { success, data, error } = SigninSchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({ error: error.message });
      return;
    }
    const { email, otp } = data;

    const storedOtp = otpCache.get(email);

    const cachedOtp = storedOtp ? parseInt(storedOtp, 10) : undefined;

    if (!cachedOtp || cachedOtp !== otp) {
      res.status(400).json({ error: "Invalid or expired OTP" });
      return;
    }

    otpCache.delete(email);

    const token = jwt.sign(
      { email, role: Role.Admin },
      process.env.ADMIN_JWT_SECRET || "supersecret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Authentication successful",
      token,
    });

  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error during signin",
    });
  }
});



// post probelm to add a new problem
router.post("/add-problem", async (req, res) => {
  try {
    const {success, data, error} = challengeSchema.safeParse(req.body);
    if(!success){
      res.status(400).json({error: error.message});
      return;
    }
    const {title, notionDocId, maxPoints, difficulty, contentMd, lastSyncedAt} = data;
    const newChallenge = await prisma.challenge.create({
      data: {
        title,
        notionDocId,
        maxPoints,
        difficulty,
        contentMd,
        lastSyncedAt
      }
    });
    res.status(201).json({message: "Problem added successfully", challenge: newChallenge});
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error while adding problem"
    });
  }

});


router.patch("challenges/:id/sync", async (req, res) => {
  try {
    const challengeId = req.params.id;
    const challenge = await prisma.challenge.findUnique({
      where: {id: challengeId}
    });
    if(!challenge){
      res.status(404).json({error: "Challenge not found"});
      return;
    }
    // logic to fetch content from notion and update the challenge



    
    res.status(200).json({message: "Challenge synced successfully"});
    
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error while syncing challenge"
    })  
    
  }


});

// delete a problem
router.delete("challenges/:id/sync", async (req, res) => {

});



export default router;