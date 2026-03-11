-- AlterTable
ALTER TABLE "steps" ADD COLUMN     "companyID" INTEGER;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
