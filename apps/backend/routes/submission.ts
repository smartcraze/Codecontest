import { SubmissionHourLimitRelaxedBaby } from "../middleware/submission-rate-limit";
import { Redisclient } from "../utils/redis";
import { inngest } from "../inngest/client";
import { SubmissionSchema } from "@repo/zodtypes";
import prisma from "@repo/db";
import { Router } from "express";

const router = Router();


/**
 * New Submission Route
 * Flow:
 * 1. Validate inputs
 * 2. Enforce per-user submission limits with Redis
 * 3. Verify contest <-> challenge mapping
 * 4. Store raw submission in DB
 * 5. Fire Inngest event for async code evaluation
 * 6. Return submission ack immediately
 */



router.post("/:challengeId",SubmissionHourLimitRelaxedBaby,async (req, res) => {
    const parsed = SubmissionSchema.safeParse({
      params: req.params,
      body: req.body,
    });

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
      return;
    }

    const { challengeId } = parsed.data.params;
    const { contestId, userId, code, language } = parsed.data.body;

    try {

      // 2. Rate limit submissions
      const subKey = `submissions:${contestId}:${challengeId}:${userId}`;
      const count = await Redisclient.incr(subKey);

      if (count === 1) {
        await Redisclient.expire(subKey, 24 * 60 * 60);
      }
      if (count > 20) {
        res.status(429).json({ error: "Submission limit reached" });
        return;
      }

      // 3. Validate contest-to-challenge mapping
      const mapping = await prisma.contestToChallengeMapping.findUnique({
        where: { contestId_challengeId: { contestId, challengeId } },
        include: { challenge: true },
      });

      if (!mapping) {
        res.status(404).json({ error: "Invalid contest/challenge mapping" });
        return;
      }

      // 4. Store submission in DB
      const newSubmission = await prisma.submission.create({
        data: {
          userId,
          code,
          language,
          contestToChallengeMappingId: mapping.id,
          status: "PENDING",
        },
      });

      // 5. Fire Inngest async evaluation
      await inngest.send({
        name: "submit/evaluate",
        data: {
          submissionId: newSubmission.id,
          userId,
          contestId,
          challengeId,
          code,
          language,
          problem: mapping.challenge.contentMd,
          testCases: mapping.challenge.contentMd, 
        },
      });

      res.status(200).json({
        message: "Submission recorded & queued for evaluation",
        submissionId: newSubmission.id,
      });
      return;
    } catch (err) {
      console.error("Error in /submit:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }
);



export default router;