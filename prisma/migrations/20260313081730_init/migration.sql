/*
  Warnings:

  - You are about to drop the column `instructionsID` on the `steps` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_instructionsID_fkey";

-- AlterTable
ALTER TABLE "steps" DROP COLUMN "instructionsID";
