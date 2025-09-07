import GemniResponse from "../ai-code-evaluator";
import { inngest } from "../client";
import prisma from "@repo/db";

export type Submission = {
  submissionId: string;
  userId: string;
  problem: string;
  code: string;
  language: string;
  testCases: {
    input: string;
    expected: string;
  }[];
};

export type EvaluationResult = {
  results: {
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[];
  score: number;
  feedback: string;
};

async function saveEvaluationToDB(
  submissionId: string,
  evaluation: EvaluationResult
) {
  // Example stub:
  // await db.submission.update({
  //   where: { id: submissionId },
  //   data: {
  //     status: "evaluated",
  //     score: evaluation.score,
  //     feedback: evaluation.feedback,
  //     results: JSON.stringify(evaluation.results),
  //   },
  // });
  console.log(`Saving evaluation for ${submissionId}`, evaluation);
}

export const EvaluateCodeFromAi = inngest.createFunction(
  {
    id: "on-code-submit",
    retries: 4,
    name: "code-evaluator",
  },
  { event: "submit/evaluate" },
  async ({ event, step }) => {
    const submission: Submission = event.data;

    try {
      // Run evaluation via AI agent
      const evaluation: EvaluationResult = await step.run(
        "evaluate-code",
        async () => {
          return await GemniResponse(submission);
        }
      );

      // Persist result to DB
      await step.run("persist-result", async () => {
        await saveEvaluationToDB(submission.submissionId, evaluation);
      });

      // Optional: small delay before finalizing
      await step.sleep("wait-a-moment", "1s");

      return {
        status: "success",
        submissionId: submission.submissionId,
        score: evaluation.score,
      };
    } catch (error: any) {
      console.error("Evaluation failed:", error);

      // Persist failure to DB
      await step.run("persist-failure", async () => {
        await saveEvaluationToDB(submission.submissionId, {
          results: [],
          score: 0,
          feedback: "Evaluation failed: " + error.message,
        });
      });

      return {
        status: "failed",
        submissionId: submission.submissionId,
        error: error.message,
      };
    }
  }
);
