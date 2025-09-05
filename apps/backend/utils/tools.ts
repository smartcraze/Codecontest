import { createAgent, createTool, gemini } from "@inngest/agent-kit";
import { z } from "zod";


export const runTestCases = createTool({
  name: "runTestCases",
  description: "Evaluate user-submitted code against given test cases using LLM",
  parameters: z.object({
    code: z.string(),
    testCases: z.array(z.object({ input: z.any(), expected: z.any() })),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        input: z.any(),
        expected: z.any(),
        actual: z.any().nullable(),
        passed: z.boolean(),
        error: z.string().optional(),
      })
    ),
  }),
  handler: async ({ code, testCases }, { agent }) => {
    // Send request to LLM to simulate code execution
    const response = await agent.invoke({
      tool: "runTestCases",
      args: { code, testCases },
    });
    return response;
  },
});
