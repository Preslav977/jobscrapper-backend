/*
  Warnings:

  - You are about to drop the column `anchorHref` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `container` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `datePosted` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `remoteOrHybrid` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `instructions` table. All the data in the column will be lost.
  - Added the required column `extractionInstructions` to the `instructions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instructions" DROP COLUMN "anchorHref",
DROP COLUMN "container",
DROP COLUMN "datePosted",
DROP COLUMN "description",
DROP COLUMN "location",
DROP COLUMN "remoteOrHybrid",
DROP COLUMN "title",
ADD COLUMN     "extractionInstructions" JSONB NOT NULL;
