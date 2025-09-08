import GemniResponse from "../ai-code-evaluator";
import { inngest } from "../client";
import prisma from "@repo/db";

export type SubmissionPayload = {
  submissionId: string;
  userId: string;
  problem: string; // challengeId or problem identifier
  code: string;
  language: string;
  testCases: {
    input: string;
    expected: string;
  }[];
};

export type EvaluationResultPayload = {
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
  evaluation: EvaluationResultPayload
) {
  // update submission
  await prisma.submission.update({
    where: { id: submissionId },
    data: {
      status: "EVALUATED",
      points: evaluation.score,
      feedback: evaluation.feedback,
      evaluations: {
        create: evaluation.results.map((r) => ({
          input: r.input,
          expected: r.expected,
          actual: r.actual,
          passed: r.passed,
        })),
      },
    },
  });
}

async function markFailure(submissionId: string, errorMessage: string) {
  await prisma.submission.update({
    where: { id: submissionId },
    data: {
      status: "FAILED",
      points: 0,
      feedback: errorMessage,
    },
  });
}

export const EvaluateCodeFromAi = inngest.createFunction(
  {
    id: "on-code-submit",
    retries: 4,
    name: "code-evaluator",
  },
  { event: "submit/evaluate" },
  async ({ event, step }) => {
    const submission: SubmissionPayload = event.data;

    try {
        
      // Run evaluation via AI agent

      const evaluationResult = await step.run(
        "evaluate-code",
        async () => {
          return await GemniResponse(submission);
        }
      );
      
      if (!evaluationResult) {
        throw new Error("Evaluation returned null result");
      }
      
      const evaluation: EvaluationResultPayload = evaluationResult;

      // Persist result to DB
      await step.run("persist-result", async () => {
        await saveEvaluationToDB(submission.submissionId, evaluation);
      });

      return {
        status: "success",
        submissionId: submission.submissionId,
        score: evaluation.score,
      };
    } catch (error: any) {
      console.error("Evaluation failed:", error);

      await step.run("persist-failure", async () => {
        await markFailure(
          submission.submissionId,
          "Evaluation failed: " + error.message
        );
      });

      return {
        status: "failed",
        submissionId: submission.submissionId,
        error: error.message,
      };
    }
  }
);


