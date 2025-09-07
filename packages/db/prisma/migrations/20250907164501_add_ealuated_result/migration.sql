/*
  Warnings:

  - You are about to drop the column `submission` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `code` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SubmissionStatus" AS ENUM ('PENDING', 'EVALUATED', 'FAILED');

-- AlterTable
ALTER TABLE "public"."Submission" DROP COLUMN "submission",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "status" "public"."SubmissionStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "points" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."EvaluationResult" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "expected" TEXT NOT NULL,
    "actual" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL,

    CONSTRAINT "EvaluationResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Submission_userId_contestToChallengeMappingId_idx" ON "public"."Submission"("userId", "contestToChallengeMappingId");

-- AddForeignKey
ALTER TABLE "public"."EvaluationResult" ADD CONSTRAINT "EvaluationResult_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "public"."Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
