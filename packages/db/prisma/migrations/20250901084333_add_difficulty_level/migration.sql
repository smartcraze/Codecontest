/*
  Warnings:

  - Added the required column `difficulty` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('Easy', 'Medium', 'Hard');

-- AlterTable
ALTER TABLE "public"."Challenge" ADD COLUMN     "difficulty" "public"."Difficulty" NOT NULL;
