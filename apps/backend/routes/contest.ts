import prisma from "@repo/db";
import { ChallengeIdSchema, ContestIdSchema, PaginationSchema, SubmissionSchema } from "@repo/zodtypes";
import { Router } from "express";
import { SubmissionHourLimitRelaxedBaby } from "../middleware/submission-rate-limit";
import  { Redisclient } from "../utils/redis";
import { inngest } from "../inngest/client";


const router = Router();



router.get("/active", async (req, res) => {
    try {

        const { success, data } = PaginationSchema.safeParse({ ...req.query });
        if (!success) {
            res.status(400).json({ error: "Invalid query parameters" });
            return;
        }

        let { offset, page } = data;

        const contests = await prisma.contest.findMany({
            where: {
                startTime: { lte: new Date() },
                endTime: { gte: new Date() }
            },
            skip: offset ? parseInt(offset) : 0,
            take: page ? parseInt(page) : 10,
            orderBy: {
                startTime: "desc",
            },
        });

        res.json({ contests });


    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error occurred while Fetching contest" });
        }
    }

})

router.get("/finished", async(req, res) => {
    try {
        const { success, data } = PaginationSchema.safeParse({ ...req.query });
        if (!success) {
            res.status(400).json({ error: "Invalid query parameters" });
            return;
        }
        let { offset, page } = data;
        const contests = await prisma.contest.findMany({
            where: {
                endTime: { lt: new Date() }
            },
            skip: offset ? parseInt(offset) : 0,
            take: page ? parseInt(page) : 10,
            orderBy: {
                endTime: "desc",
            },
        });
        res.json({ contests });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error occurred while Fetching contest" });
        }

    }
})





// return all the sub challenges and their start times.
router.get("/:contestId", async (req, res) => {
    try {
        const { success, data } = ContestIdSchema.safeParse(req.params);
        if (!success) {
            res.status(400).json({ error: "Invalid contest ID" });
            return;
        }

        const { contestId } = data;


        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            include: {
                contestToChallengeMapping: {
                    include: { challenge: true },
                    orderBy: { index: "asc" }
                }
            }
        });

        if (!contest) {
            res.status(404).json({ error: "Contest not found" });
            return;
        }

        const challenges = contest.contestToChallengeMapping.map(m => ({
            id: m.challenge.id,
            title: m.challenge.title,
            index: m.index,
            startTime: contest.startTime,
            endTime: contest.endTime
        }));

        res.json({ contestId, challenges });

    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});




// get the details of a particular challenge in a contest
router.get("/:contestId/:challengeId", async(req, res) => {
    try {
        const { success, data } = ChallengeIdSchema.safeParse(req.params);
        if (!success) {
            res.status(400).json({ error: "Invalid parameters" });
            return;
        }
        const { challengeId, contestId } = data;

        // check if the challenge is part of the contest

        const mapping = await prisma.contestToChallengeMapping.findFirst({
            where: {
                challengeId,
                contestId
            }
        });


        if (!mapping) {
            res.status(404).json({ error: "Challenge not found in the contest" });
            return;
        }
        const challenge = await prisma.challenge.findUnique({
            where: { id: challengeId },
            select: {
                id: true,
                title: true,
                notionDocId: true,
                maxPoints: true,
                difficulty: true
            }
        });

        if (!challenge) {
            res.status(404).json({ error: "Challenge not found" });
            return;
        }

        res.json({ challenge });


    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error occurred while Fetching challenge" });
        }

    }

})



/*
return the leaderboard of the contest
top 100 users
based on the points scored and time taken to solve the challenges
use redis sorted set to store the leaderboard
zadd contest:<contestId> <score> <userId>
zrevrange contest:<contestId> 0 99 withscores
*/

router.get("/leaderboard/:contestId", async (req, res) => {
    try {
        const { success, data } = ContestIdSchema.safeParse(req.params);

        if (!success) return res.status(400).json({ error: "Invalid contest ID" });

        const { contestId } = data;

        const leaderboard = await Redisclient.zRangeWithScores(
            `contest:${contestId}`,
            0,
            99,
            { REV: true }
        );


        res.json({ leaderboard });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});


function encodeScore(points: number, timeTaken: number): number {
  return points * 1_000_000 - timeTaken;
}


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

router.post(
  "/submit/:challengeId",
  SubmissionHourLimitRelaxedBaby,
  async (req, res) => {
    // 1. Validate with Zod
    const parsed = SubmissionSchema.safeParse({
      params: req.params,
      body: req.body,
    });

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid input", details: parsed.error.format() });
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
          testCases: mapping.challenge.contentMd, // refine later if test cases are JSON
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
