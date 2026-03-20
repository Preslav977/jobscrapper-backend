/*
  Warnings:

  - You are about to drop the column `careersButton` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `careersHoverButton` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `categoryClickSelect` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `categorySelect` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `categorySelectOption` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobContainer` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobDatePosted` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobDescription` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobDetailsAnchorHref` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobLocation` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobRemoteOrHybrid` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `joinUsButton` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `joinUsHoverButton` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `loadMoreButton` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `locationClickSelect` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `locationSelect` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `locationSelectOption` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `navigationMenuClick` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `nextPageButton` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `scrollToContainer` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `showMoreJobsOnPage` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `submitFormButton` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `typingInput` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `hybridOrRemote` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `remoteOrHybrid` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "browserNavigation" TEXT;

-- AlterTable
ALTER TABLE "instructions" DROP COLUMN "careersButton",
DROP COLUMN "careersHoverButton",
DROP COLUMN "categoryClickSelect",
DROP COLUMN "categorySelect",
DROP COLUMN "categorySelectOption",
DROP COLUMN "jobContainer",
DROP COLUMN "jobDatePosted",
DROP COLUMN "jobDescription",
DROP COLUMN "jobDetailsAnchorHref",
DROP COLUMN "jobLocation",
DROP COLUMN "jobRemoteOrHybrid",
DROP COLUMN "jobTitle",
DROP COLUMN "joinUsButton",
DROP COLUMN "joinUsHoverButton",
DROP COLUMN "loadMoreButton",
DROP COLUMN "locationClickSelect",
DROP COLUMN "locationSelect",
DROP COLUMN "locationSelectOption",
DROP COLUMN "navigationMenuClick",
DROP COLUMN "nextPageButton",
DROP COLUMN "scrollToContainer",
DROP COLUMN "showMoreJobsOnPage",
DROP COLUMN "submitFormButton",
DROP COLUMN "typingInput",
ADD COLUMN     "anchorHref" JSONB,
ADD COLUMN     "container" JSONB,
ADD COLUMN     "datePosted" JSONB,
ADD COLUMN     "location" JSONB,
ADD COLUMN     "remoteOrHybrid" JSONB,
ADD COLUMN     "title" JSONB;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "hybridOrRemote",
DROP COLUMN "qualification",
ADD COLUMN     "remoteOrHybrid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "steps" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "selector" TEXT NOT NULL,
    "instructionsID" INTEGER NOT NULL,

    CONSTRAINT "steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_instructionsID_fkey" FOREIGN KEY ("instructionsID") REFERENCES "instructions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
