-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_companyID_fkey";

-- AlterTable
ALTER TABLE "instructions" ALTER COLUMN "companyID" DROP NOT NULL,
ALTER COLUMN "extractionInstructions" DROP NOT NULL;

-- AlterTable
ALTER TABLE "steps" ALTER COLUMN "companyID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
