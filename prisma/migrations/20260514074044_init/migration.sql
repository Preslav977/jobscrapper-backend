/*
  Warnings:

  - You are about to drop the column `benefits` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `interviewSteps` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `niceToHave` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `responsibilities` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "benefits",
DROP COLUMN "interviewSteps",
DROP COLUMN "niceToHave",
DROP COLUMN "requirements",
DROP COLUMN "responsibilities",
ADD COLUMN     "description" TEXT;
