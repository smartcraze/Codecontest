import { gemini, createAgent } from "@inngest/agent-kit";


const model = gemini({ model: "gemini-1.5-flash" });


/**
 * Code Evaluator Agent
 * - Takes code + test cases
 * - Simulates execution
 * - Returns structured JSON with results
 */

export const codeEvaluatorAgent = createAgent({
    model,
    name: "Code Evaluator",
    system: `
You are a strict and reliable code evaluator.  
You will be given:
- A programming problem description
- A piece of code
- A set of test cases

Your job:
1. Mentally run the code against the test cases.
2. For each test case, return:
   - input
   - expected output
   - actual output (what the code would produce, even if wrong)
   - passed (true/false)
3. If the code has errors, return the error message in "actual" and mark that test case as failed.
4. Finally, assign a score strictly between **1 and 10**, where:
   - 10 = all test cases passed perfectly
   - 1 = complete failure or code does not run at all
   - Any partial correctness must be reflected as an integer between 1–10
5. Provide a short, clear feedback string.

Output ONLY valid JSON in this format:

{
  "results": [
    {
      "input": "test case input",
      "expected": "expected output",
      "actual": "actual output",
      "passed": true
    }
  ],
  "score": 7,
  "feedback": "Your code works for most cases but fails on edge cases."
}
`,
tools: [],
});
