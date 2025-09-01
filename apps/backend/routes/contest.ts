import prisma from "@repo/db";
import { ChallengeIdSchema, ContestIdSchema, PaginationSchema } from "@repo/zodtypes";
import { Router } from "express";
import { z } from "zod";
import { SubmissionHourLimitRelaxedBaby } from "../middleware/submission-rate-limit";

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

router.get("/finished", (req, res) => {
    try {
        const { success, data } = PaginationSchema.safeParse({ ...req.query });
        if (!success) {
            res.status(400).json({ error: "Invalid query parameters" });
            return;
        }
        let { offset, page } = data;
        const contests = prisma.contest.findMany({
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
router.get("/:contestId/:challengeId", (req, res) => {
    try {
        const { success, data } = ChallengeIdSchema.safeParse(req.params);
        if (!success) {
            res.status(400).json({ error: "Invalid parameters" });
            return;
        }
        const { challengeId, contestId } = data;

        // check if the challenge is part of the contest
        const mapping = prisma.contestToChallengeMapping.findFirst({
            where: {
                challengeId,
                contestId
            }
        });
        if (!mapping) {
            res.status(404).json({ error: "Challenge not found in the contest" });
            return;
        }
        const challenge = prisma.challenge.findUnique({
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

router.get("/leaderboard/:contestId", (req, res) => {
    try {
        const { success, data } = ContestIdSchema.safeParse(req.params);
        if (!success) {
            res.status(400).json({ error: "Invalid contest ID" });
            return;
        }
        const { contestId } = data;
        // fetch from redis
        // const leaderboard = await redis.zrevrange(`contest:${contestId}`, 0, 99, 'WITHSCORES');
        res.json({ leaderboard: [] });


    } catch (error) {

    }


})

router.post("/submit/:challengeId", SubmissionHourLimitRelaxedBaby, (req, res) => {
    // have rate limitting
    // max 20 submissions per problem
    // forward the request to GPT
    // store the response in sorted set and the DB
})

export default router;