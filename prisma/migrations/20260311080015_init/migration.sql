/*
  Warnings:

  - Made the column `companyID` on table `steps` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_companyID_fkey";

-- AlterTable
ALTER TABLE "steps" ALTER COLUMN "companyID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
