/*
  Warnings:

  - You are about to drop the column `description` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "description",
ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "interviewSteps" TEXT,
ADD COLUMN     "niceToHave" TEXT,
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "responsibilities" TEXT;
