/*
  Warnings:

  - You are about to drop the column `jobCategoryClickSelect` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobCategorySelect` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobTypingInput` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobsContainer` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobsContainerDesc` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobsContainerDetailsAnchor` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobsContainerLocation` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobsContainerTitle` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobsDatePosted` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobsWorkingDay` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobsWorkingType` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `fullTimeOrNot` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `jobAnchor` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `jobDescription` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `jobQualification` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `description` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instructions" DROP COLUMN "jobCategoryClickSelect",
DROP COLUMN "jobCategorySelect",
DROP COLUMN "jobTypingInput",
DROP COLUMN "jobsContainer",
DROP COLUMN "jobsContainerDesc",
DROP COLUMN "jobsContainerDetailsAnchor",
DROP COLUMN "jobsContainerLocation",
DROP COLUMN "jobsContainerTitle",
DROP COLUMN "jobsDatePosted",
DROP COLUMN "jobsWorkingDay",
DROP COLUMN "jobsWorkingType",
ADD COLUMN     "categoryClickSelect" TEXT,
ADD COLUMN     "categorySelect" TEXT,
ADD COLUMN     "jobContainer" TEXT,
ADD COLUMN     "jobDatePosted" TEXT,
ADD COLUMN     "jobDescription" TEXT,
ADD COLUMN     "jobDetailsAnchorHref" TEXT,
ADD COLUMN     "jobLocation" TEXT,
ADD COLUMN     "jobRemoteOrHybrid" TEXT,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "typingInput" TEXT;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "fullTimeOrNot",
DROP COLUMN "jobAnchor",
DROP COLUMN "jobDescription",
DROP COLUMN "jobQualification",
DROP COLUMN "jobTitle",
ADD COLUMN     "anchorHref" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "qualification" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
