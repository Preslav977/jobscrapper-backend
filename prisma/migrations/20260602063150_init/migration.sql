/*
  Warnings:

  - Made the column `companyID` on table `instructions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `extractionInstructions` on table `instructions` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updateAt` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `jobs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyID` on table `steps` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_companyID_fkey";

-- AlterTable
ALTER TABLE "instructions" ALTER COLUMN "companyID" SET NOT NULL,
ALTER COLUMN "extractionInstructions" SET NOT NULL;

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "steps" ALTER COLUMN "companyID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
