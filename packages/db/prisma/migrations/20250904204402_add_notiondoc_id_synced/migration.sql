/*
  Warnings:

  - A unique constraint covering the columns `[notionDocId]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contentMd` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Challenge" ADD COLUMN     "contentMd" TEXT NOT NULL,
ADD COLUMN     "lastSyncedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_notionDocId_key" ON "public"."Challenge"("notionDocId");
